package com.dbms.store.model;

public class Cart {
       private int cloth_id;
       private String username;
       private String size;
       private int Quantity; 

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
     * @return String return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
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
     * @return int return the Quantity
     */
    public int getQuantity() {
        return Quantity;
    }

    /**
     * @param Quantity the Quantity to set
     */
    public void setQuantity(int Quantity) {
        this.Quantity = Quantity;
    }



}
