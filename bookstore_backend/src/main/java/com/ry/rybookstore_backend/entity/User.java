package com.ry.rybookstore_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="users")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class User {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "live")
    private String live;

    @Column(name = "password")
    private String password;

    @Column(name = "username")
    private String username;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "administractor")
    private int administractor;

    @Column(name = "ban")
    private int ban;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"user"})
    private List<Order> orders;

    //must use LAZY
    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"user"})
    private List<CartItem> cartItems;

    public User(int id, String live, String password, String username, String address, String email, String telephone) {
        this.id = id;
        this.live = live;
        this.password = password;
        this.username=username;
        this.address=address;
        this.email = email;
        this.telephone = telephone;
        this.administractor=0;
        this.ban=0;
    }

    public User() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getBan() { return ban; }
    public void setBan(int ban) { this.ban = ban; }

    public String getLive() { return live; }
    public void setLive(String live) { this.live = live; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public int getAdministractor() { return administractor; }
    public void setAdministractor(int administractor) { this.administractor = administractor; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public List<CartItem> getCartItems() { return cartItems; }
    public void setCartItems(List<CartItem> cartItems) { this.cartItems = cartItems; }

    public List<Order> getOrders() { return orders; }
    public void setOrders(List<Order> orders) { this.orders = orders; }
}

