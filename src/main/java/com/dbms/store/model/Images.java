package com.dbms.store.model;

public class Images {
    private int cloth_id;
    private String url;

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
     * @return String return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url the url to set
     */
    public void setUrl(String url) {
        this.url = url;
    }
}
