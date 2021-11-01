package com.dbms.store.model;

public class Features {
 
        private int cloth_id;
        private String feature_name;
        private String value;


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
     * @return String return the feature_name
     */
    public String getFeature_name() {
        return feature_name;
    }

    /**
     * @param feature_name the feature_name to set
     */
    public void setFeature_name(String feature_name) {
        this.feature_name = feature_name;
    }

    /**
     * @return String return the value
     */
    public String getValue() {
        return value;
    }

    /**
     * @param value the value to set
     */
    public void setValue(String value) {
        this.value = value;
    }

}
