import requests
import threading
from selenium import webdriver
from selenium.webdriver.common.by import By
from pyvirtualdisplay import Display
import mysql.connector
from threading import Thread
import time
import random
from random import choices
import os
op = webdriver.ChromeOptions()
vdisplay = Display(visible=0, size=(1920, 1080))
vdisplay.start()

db = []
file = open('links.txt', 'r')
file = file.readlines()
links = []
for i in file:
    links.append(i.split('\n')[0])

weights = [0.1, 0.2, 0.25, 0.25, 0.1, 0.1]
sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']


def weighted_sample_without_replacement(population, weights, k=1):
    weights = list(weights)
    positions = range(len(population))
    indices = []
    while True:
        needed = k - len(indices)
        if not needed:
            break
        for i in choices(positions, weights, k=needed):
            if weights[i]:
                weights[i] = 0.0
                indices.append(i)
    return [population[i] for i in indices]


def getPrice(price):
    L = max(100, price - 200)
    R = price + 200
    return random.randint(L, R)


def getStock(price, id):
    num = random.randint(1, 4)
    indexes = weighted_sample_without_replacement(range(0, 6), weights, num)
    stock = []
    for i in indexes:
        stock.append((id, sizes[i], random.randint(1, 100), getPrice(price)))
    return stock


def download_image(filename, image_url):

    # Open the url image, set stream to True, this will return the stream content.
    r = requests.get(image_url).content
    with open(filename, 'wb') as f:
        f.write(r)


def extract(db, link):
    driver = webdriver.Chrome('./chromedriver', options=op)
    driver.get(link)
    time.sleep(2)
    data = {}
    data["Complete The Look"] = ""
    data["brand"] = driver.find_element(
        By.CLASS_NAME, value="pdp-title").text
    data["name"] = driver.find_element(
        By.CLASS_NAME, value="pdp-name").text
    data["price"] = driver.find_element(
        By.CLASS_NAME, value="pdp-price").text.split(' ')[1]
    tmp = driver.find_elements(By.CLASS_NAME, value="breadcrumbs-link")
    data["category"] = tmp[3].text
    data["gender"] = tmp[2].text.split(' ')[0]
    images = driver.find_elements(
        By.CLASS_NAME, value="image-grid-image"
    )
    urls = []
    for img in images:
        urls.append(img.value_of_css_property(
            "background-image").split("(")[1].split(")")[0].split("\"")[1])
    data["url"] = urls
    elem = driver.find_elements(
        By.CLASS_NAME, value="pdp-productDescriptorsContainer")[0]
    try:
        elem.find_element(By.CLASS_NAME, value="index-showMoreText").click()
    except:
        driver.close()
        return
    tmp = elem.find_elements(
        By.CLASS_NAME, value="pdp-product-description-title")
    tmp2 = elem.find_elements(
        By.CLASS_NAME, value="pdp-product-description-content")

    ld = []
    for i in range(len(tmp)):
        ld.append([tmp[i].text, tmp2[i].get_attribute("innerHTML")])
    data["ld"] = ld
    table = []

    tmp = elem.find_elements(By.CLASS_NAME, value="index-rowKey")
    tmp2 = elem.find_elements(By.CLASS_NAME, value="index-rowValue")
    for i in range(len(tmp)):
        table.append([tmp[i].text, tmp2[i].text])
    data["table"] = table
    tmp = elem.find_elements(
        By.CLASS_NAME, value="index-product-description-title")
    tmp = tmp[1:]
    tmp2 = elem.find_elements(
        By.CLASS_NAME, value="index-product-description-content")
    if(len(tmp) != len(tmp2)):
        driver.close()
        return
    for i in range(len(tmp)):
        data[tmp[i].text] = tmp2[i].text
    db.append(data)


def start(db, j):
    threads = []
    for i in range(j, j + 10):
        thr = threading.Thread(target=extract, args=(db, links[i]))
        thr.start()
        threads.append(thr)
    for i in threads:
        i.join()


start(db, 20)


mydb = mysql.connector.connect(
    host="localhost",
    user="dbms",
    password="dbms2019@",
    database="dbms"
)

added = 0


def addCloth(cloth):
    global added
    if(cloth["Complete The Look"] == "" or len(cloth["url"]) == 0 or len(cloth["table"]) == 0):
        return
    added += 1
    mycursor = mydb.cursor()
    name = cloth["name"]
    brand = cloth["brand"]
    short_description = cloth["Complete The Look"]
    seller = "rivalq"
    gender = cloth["gender"]
    category = cloth["category"]
    insert_sql = "INSERT INTO marketplace(name,brand,category,short_description,long_description,gender,seller) VALUES(%s,%s,%s,%s,%s,%s,%s)"
    id_sql = "SELECT MAX(cloth_id) FROM marketplace"
    long_description = ""
    ld = cloth["ld"]
    for i in ld:
        long_description += "<h5>{}</h5>".format(i[0]) + i[1] + "<br /><br />"
    long_description += "<h5>Complete The Look</h5>" + \
        cloth["Complete The Look"] + "<br/>"
    row = (name, brand, category, short_description,
           long_description, gender, seller)
    mycursor.execute(insert_sql, row)
    mycursor.execute(id_sql)
    res = mycursor.fetchall()
    id = 0
    for i in res[0]:
        id = i
    os.mkdir(
        "/home/rivalq/CS/store/src/main/resources/static/images/marketplace/" + str(id))
    cnt = 0
    images = []
    for img in cloth["url"]:
        name = str(cnt)
        if(cnt == 0):
            name = "profile"
        dest = "/home/rivalq/CS/store/src/main/resources/static/images/marketplace/"
        filename = dest + str(id) + "/" + name
        download_image(filename, img)
        url = "/images/marketplace/" + str(id) + "/" + name
        images.append([id, url])
        cnt += 1
    features = []
    for row in cloth["table"]:
        features.append((id, row[0], row[1]))
    mycursor.executemany(
        "INSERT INTO images(cloth_id,url) VALUES(%s,%s)", images)
    stock = getStock(int(cloth["price"]), id)
    mycursor.executemany(
        "INSERT INTO stock(cloth_id,size,quantity,price) VALUES(%s,%s,%s,%s)", stock)
    mycursor.executemany(
        "INSERT INTO features(cloth_id,feature_name,value) VALUES(%s,%s,%s)", features)
    print(id)


for i in db:
    addCloth(i)

mydb.commit()
