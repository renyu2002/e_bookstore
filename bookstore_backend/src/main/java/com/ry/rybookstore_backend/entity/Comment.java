package com.ry.rybookstore_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="comment")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Comment {

    @Id
    @Column(name = "Cid")
    private int Cid;

    @Column(name = "id")
    private int id;

    @Column(name = "time")
    private String time;

    @Column(name = "comment")
    private String comment;

    @Column(name = "name")
    private String name;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getCid() { return Cid; }
    public void setCid(int Cid) { this.Cid = Cid; }

    public String getTime() { return time; }
    public void setTime(String time) {this.time = time;}

    public String getComment() {return comment; }
    public void setComment(String comment) {this.comment = comment;}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

}