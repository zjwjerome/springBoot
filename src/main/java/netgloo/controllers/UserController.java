package netgloo.controllers;

import netgloo.models.User;
import netgloo.models.UserDao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * A class to test interactions with the MySQL database using the UserDao class.
 *
 * @author netgloo
 */
@Controller
public class UserController {

  // ------------------------
  // PUBLIC METHODS
  // ------------------------
  
  /**
   * /create  --> Create a new user and save it in the database.
   * 
   * @param username User's username
   * @param password User's password
   * @return A string describing if the user is succesfully created or not.
   */
  @RequestMapping("/create")
  @ResponseBody
  public String create(String username, String password) {

    User user = null;
    try {
      user = new User(username, password);
      User user1 = userDao.findByUsername(username);
      if(user1 == null)
      {
        userDao.save(user);
        return "yes";
      }
      else
        return "no";
    }
    catch (Exception ex) {
      return "Error creating the user: " + ex.toString();
    }
  }

  @RequestMapping("/login")
  @ResponseBody
  public String login(String username, String password) {


    User user = null;
    user = new User(username, password);
    User user2 = userDao.findByUsername(user.getUsername());

    if (user2 == null || !user2.getPassword().equals(user.getPassword())) {
      return "ccc";
    }
    else
    {
      if(user2.getPriority() == 0)
        return "normal";
      else
        return "super";
    }
  }
  @RequestMapping("/findall")
  @ResponseBody
  public List<User> getUsers() {
    return (List<User>) userDao.findAll();
  }
  /**
   * /delete  --> Delete the user having the passed id.
   * 
   * @param id The id of the user to delete
   * @return A string describing if the user is succesfully deleted or not.
   */
  @RequestMapping("/delete")
  @ResponseBody
  public String delete(long id) {
    try {
      User user = new User(id);
      userDao.delete(user);
    }
    catch (Exception ex) {
      return "Error deleting the user: " + ex.toString();
    }
    return "User succesfully deleted!";
  }
  
  /**
   * /get-by-username  --> Return the id for the user having the passed username.
   * 
   * @param username The username to search in the database.
   * @return The user id or a message error if the user is not found.
   */
  @RequestMapping("/get-by-username")
  @ResponseBody
  public String getByUsername(String username) {
    String userId;
    try {
      User user = userDao.findByUsername(username);
      userId = String.valueOf(user.getId());
    }
    catch (Exception ex) {
      return "User not found";
    }
    return "The user id is: " + userId;
  }

  @RequestMapping("/check-username")
  @ResponseBody
  public String check(String username) {
    try {
      User user = userDao.findByUsername(username);
      if(user.equals(null))
        return  "yes";
      else
        return "no";
    }
    catch (Exception ex) {
      return "yes";
    }
    //return "The user id is: " + userId;
  }

  /**
   * /get-by-password  --> Return the id for the user having the passed password.
   *
   * @param password The password to search in the database.
   * @return The user id or a message error if the user is not found.
   */
  @RequestMapping("/get-by-password")
  @ResponseBody
  public String getByPassword(String password) {
    String userId;
    try {
      User user = userDao.findByPassword(password);
      userId = String.valueOf(user.getId());
    }
    catch (Exception ex) {
      return "User not found";
    }
    return "The user id is: " + userId;
  }

  /**
   * /update  --> Update the username and the password for the user in the database 
   * having the passed id.
   * 
   * @param id The id for the user to update.
   * @return A string describing if the user is succesfully updated or not.
   */
  @RequestMapping("/update")
  @ResponseBody
  public String updateUser(long id) {
    try {
      User user = userDao.findOne(id);
      user.setPriority(1);
      userDao.save(user);
    }
    catch (Exception ex) {
      return "Error updating the user: " + ex.toString();
    }
    return "User succesfully updated!";
  }

  // ------------------------
  // PRIVATE FIELDS
  // ------------------------

  @Autowired
  private UserDao userDao;
  
} // class UserController
