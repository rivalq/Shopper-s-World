package com.dbms.store.model;

public class Cloth {
    private int cloth_id;
    private String name;
    private String short_description;
    private String long_description;
    private String category;
    private String brand;
    private String Seller;
    private float rating;
    private float admin_rating;
    private boolean custom;
    private String gender;
    private boolean hide;

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

    /**
     * @return float return the rating
     */
    public float getRating() {
        return rating;
    }

    /**
     * @param rating the rating to set
     */
    public void setRating(float rating) {
        this.rating = rating;
    }

    /**
     * @return float return the admin_rating
     */
    public float getAdmin_rating() {
        return admin_rating;
    }

    /**
     * @param admin_rating the admin_rating to set
     */
    public void setAdmin_rating(float admin_rating) {
        this.admin_rating = admin_rating;
    }

    /**
     * @return boolean return the custom
     */
    public boolean isCustom() {
        return custom;
    }

    /**
     * @param custom the custom to set
     */
    public void setCustom(boolean custom) {
        this.custom = custom;
    }

    /**
     * @return String return the gender
     */
    public String getGender() {
        return gender;
    }

    /**
     * @param gender the gender to set
     */
    public void setGender(String gender) {
        this.gender = gender;
    }

    /**
     * @return boolean return the hide
     */
    public boolean isHide() {
        return hide;
    }

    /**
     * @param hide the hide to set
     */
    public void setHide(boolean hide) {
        this.hide = hide;
    }
}
