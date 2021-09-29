
package com.dbms.store.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Request {


       @JsonProperty("cloth_id") 
       private int cloth_id;
       
       @JsonProperty("request_id")
       private int request_id;

       @JsonProperty("seller")
       private String seller;

       @JsonProperty("size")
       private String size;

       @JsonProperty("quantity")
       private int quantity;

       @JsonProperty("price")
       private int price;

       @JsonProperty("status")
       private boolean status;

       @JsonProperty("result")
       private boolean result;
       
       private int mp_cloth;


    /**
     * @return int return the cloth_id
     */
    public int getCloth_id() {
        return cloth_id;
    }

    /**
     * @param cloth_id the cloth_id to set
     */
    public void setCloth_id(int cloth_id) {
        this.cloth_id = cloth_id;
    }

    /**
     * @return int return the request_id
     */
    public int getRequest_id() {
        return request_id;
    }

    /**
     * @param request_id the request_id to set
     */
    public void setRequest_id(int request_id) {
        this.request_id = request_id;
    }

    /**
     * @return String return the seller
     */
    public String getSeller() {
        return seller;
    }

    /**
     * @param seller the seller to set
     */
    public void setSeller(String seller) {
        this.seller = seller;
    }

    /**
     * @return String return the size
     */
    public String getSize() {
        return size;
    }

    /**
     * @param size the size to set
     */
    public void setSize(String size) {
        this.size = size;
    }

    /**
     * @return int return the quantity
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * @param quantity the quantity to set
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    /**
     * @return int return the price
     */
    public int getPrice() {
        return price;
    }

    /**
     * @param price the price to set
     */
    public void setPrice(int price) {
        this.price = price;
    }

    /**
     * @return boolean return the status
     */
    public boolean isStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(boolean status) {
        this.status = status;
    }

    /**
     * @return boolean return the result
     */
    public boolean isResult() {
        return result;
    }

    /**
     * @param result the result to set
     */
    public void setResult(boolean result) {
        this.result = result;
    }


    /**
     * @return int return the mp_cloth
     */
    public int getMp_cloth() {
        return mp_cloth;
    }

    /**
     * @param mp_cloth the mp_cloth to set
     */
    public void setMp_cloth(int mp_cloth) {
        this.mp_cloth = mp_cloth;
    }

}
