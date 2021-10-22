package com.dbms.store.model;

public class ClothRating {
    private int cloth_id;
    private float rating;
    private float admin_rating;
    private boolean custom;

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
}
