
# Cloth Store 

**Name** : Jatin Garg

**Roll Number**: 19075037

#### Problem Statement

Our client is very famous Cloth Store **Shopper's World**. We need to design an Database system for there store with an Interactive Frontend Site where Customers can View the Clothes and they also can Order the Clothes Online. Below are the requirements for the system

Site Have three types of users
1.  **Admin** - There is a different page specially for Admin where admin in able to perform CRUD(Create, Read, Update, Delete) Operations on Data (Tables).
2.  **Seller** - Again Seller have different page as well. Role of seller is basically to provide Clothes to our Client **Shopper's World**, just like we see on amazon seller displays there cloth on amazon and customer's bought them, there amazon just acts as closer who closes the deal between customer and seller. But here in our case **Shopper's World** will first **bought** the clothes from sellers and then sells it to us. So there is slight difference between both the models. Sellers can create new Cloth desigens on Site and sell that to the marketplace.
3. **Customer**- Customers can view cloth designes and there specifications including prices and sizes available on site. They can add clothes to wishlist. There will cart associated to every customer where they can add clothes and checkout whenever they want. Every customer will credits associated to there account, with the help of credits they can pay online. After buying the clothes, they can rate them and give there reviews to the clothes.

**Rating system**- Every cloth can have rating from 1 to 5 (any real value between them). When a new cloth is added to system, its rating will be set to 5.0. Clothes has two types of Rating *Admin-rating* and *Customer-Rating*.  Admin Rating is Controlled by the Admin. Customer rating is defined as **mean** of all the ratings given by cutomers to that cloth. Customer rating is initially 0 as there are no one has purchased them. Admin can switch the ratings to display from admin panel.

**Cloth Request System**- For seller to sell the cloth to Shopper's world, there will be a proper system/protocal called request system. Seller will send a request stating he wants to sell this cloth (with some given size and price, number of units). Then from admin panel admin will see the request. Now admin can either accepts the request in that case cloth will be added to marketplace (where user will se see the clothes). Admin can also set the new MRP of the cloth. If admin rejects the request Nothing will happend seller will be notified for the request result.

**Cloth Design Page**- On this page customer should be able to see cloth details and can also see images reated to them. Admin will have special access to this page where he can edit cloth details and upload new images or discard old ones.


**Review System** - After buying cloth from the marketplace, it will be then added to the purchased clothes page. where cutsomer can rate the cloth and give review. This will ensure that no customer can alter the reviews and rating if he/she hadn't bought that cloth.

**Wishlist** - Customers can add remove the clothes from wishlist.





**Pages on the Site**
1. Homepage (Landing Page)
2. Shopping page (where user can see every clothes)
3. Cloth Interface (where user can see details of particular cloth)
4. Wishlist
5. Cart
6. Purcahsed Clothes
7. Reviews (Where user can see there past review and edit and delete them)
8. Admin Panel 
9. Seller Panel
10. Seller Cloth Interface (where seller can see there designed clothes)
11. Profile page (where user can see his profile details and update them)
12. Register Page
13. Login Page
14. Contact Us (where some can send some type of message to admins)

****
Site is deployed at  http://jatin.eastus.cloudapp.azure.com on the Microsoft azure platform. MySQL database associated with the site is also deployed on Microsoft Azure.

Feature of Site
1. Tech Stack used is Spring boot and for Relation database MySQL is used. Frontend is created using HTML,CSS,JS and BootStrap.
2. Site is Secured using the Spring Security. Every user on internet should be able to view clothes on site hence Cloth Interface,Home pages are not authenticated. Other than that every page will be authenticated first.
3. Use of Asynchronous Javascript to Make the User Experience better.
4. Right Now site is designed for multi seller single marketplace. But Backend is designed in such way so that it can handle multiseller multi marketplace design. This design system is usefull when Some big brands has multiple stores all over the world.
5. Customer ratings is handled by Trigger Mechanism in MySQL.








