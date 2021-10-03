package com.dbms.store.model;

public class Cloth {
    private int cloth_id;
    private String name;
    private String short_description;
    private String long_description;
    private String category;
    private String brand;
    private String Seller;
   
   
  
    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return String return the short_description
     */
    public String getShort_description() {
        return short_description;
    }

    /**
     * @param short_description the short_description to set
     */
    public void setShort_description(String short_description) {
        this.short_description = short_description;
    }

    /**
     * @return String return the long_description
     */
    public String getLong_description() {
        return long_description;
    }

    /**
     * @param long_description the long_description to set
     */
    public void setLong_description(String long_description) {
        this.long_description = long_description;
    }

    /**
     * @return String return the category
     */
    public String getCategory() {
        return category;
    }

    /**
     * @param category the category to set
     */
    public void setCategory(String category) {
        this.category = category;
    }

    /**
     * @return String return the brand
     */
    public String getBrand() {
        return brand;
    }

    /**
     * @param brand the brand to set
     */
    public void setBrand(String brand) {
        this.brand = brand;
    }


    /**
     * @return String return the Seller
     */
    public String getSeller() {
        return Seller;
    }

    /**
     * @param Seller the Seller to set
     */
    public void setSeller(String Seller) {
        this.Seller = Seller;
    }


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

}