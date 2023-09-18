package controller

import (
	"echo-server/db"
	"echo-server/models"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GET USERS
func GetUsers(c echo.Context) error {
	var user []models.User

	//result := db.DB.Joins("inner join cities c on c.id  = users.ciudad_id").Select("users.*, c.name, c.department_id").Find(&userResponse)
	//result := db.DB.Joins("inner join cities c on c.id  = users.ciudad_id").Select("users.*, c.name, c.department_id").Find(&user)
	result := db.DB.Preload("City").Find(&user)

	if result.Error != nil {
		return result.Error
	}

	return c.JSON(http.StatusOK, user)
}

// GET USERS WITH DEPARTMENT ID
func GetUsersDepartment(c echo.Context) error {
	//var user []models.User
	var userResponse []models.UserResponse

	result := db.DB.Table("users").Select("users.*, c.name as nombre_ciudad, c.department_id,(select json_agg(json_build_object('id',c2.id,'nombre',c2.name))::jsonb from cities c2  where c2.department_id = c.department_id) cities").Joins("inner join cities c on c.id  = users.ciudad_id").Where("users.deleted_at is null").Scan(&userResponse)

	//result := db.DB.Joins("inner join cities c on c.id  = users.ciudad_id").Select("users.*, c.name, c.department_id").Find(&userResponse)
	//result := db.DB.Joins("inner join cities c on c.id  = users.ciudad_id").Select("users.*, c.name, c.department_id").Find(&user)
	//result := db.DB.Find(&user)

	if result.Error != nil {
		return result.Error
	}

	fmt.Print(userResponse)

	return c.JSON(http.StatusOK, userResponse)
}

// GET ONE USER BY ID
func GetUser(c echo.Context) error {
	var user models.User

	id := c.Param("id")
	fmt.Println("obteniendo usuario" + id)
	db.DB.Preload("City").First(&user, id)
	//res := db.DB.First(&user, id)
	/*if res.Error != nil {
		return res.Error
	}*/

	if user.ID == 0 {
		return c.JSON(http.StatusNotFound, "Usuario no existe")
	}

	return c.JSON(http.StatusOK, user)

}

// GET ONE USER BY NUMID
func GetUserByNumId(c echo.Context) error {
	var user models.User
	//var userResponse models.UserResponse

	id := c.Param("id")

	//db.DB.Preload("City").First(&user, id)

	//db.DB.Table("users").Select("users.*, c.name as nombre_ciudad, c.department_id").Joins("inner join cities c on c.id  = users.ciudad_id").Where("users.deleted_at is null and users.number_id = ?", id).Scan(&userResponse)

	db.DB.Preload("City").Where("number_id", id).First(&user)
	//res := db.DB.Where("number_id", id).First(&user)
	/*if res.Error != nil {
		return res.Error
	}*/

	if user.ID == 0 {
		return c.JSON(http.StatusNotFound, "Usuario no existe")
	}

	//return c.JSON(http.StatusOK, userResponse)
	return c.JSON(http.StatusOK, user)

}

// CREATE USER
func CreateUser(c echo.Context) error {
	var user models.User
	var userfound models.User

	if err := c.Bind(&user); err != nil {
		return err
	}

	fmt.Println(user)

	numid := user.NumberId

	db.DB.Where("number_id", numid).First(&userfound)
	/*if res.Error != nil {
		return res.Error
	}*/

	if userfound.ID != 0 {
		return c.JSON(http.StatusFound, "Usuario ya existe")
	}

	result := db.DB.Create(&user)

	if result.Error != nil {
		return result.Error
	}

	return c.JSON(http.StatusOK, user)
}

// UPDATE USER
func UpdateUser(c echo.Context) error {
	var user models.User
	id := c.Param("id")

	fmt.Println("Updating user")

	res := db.DB.First(&user, id)
	if res.Error != nil {
		return res.Error
	}

	if user.ID == 0 {
		return c.JSON(http.StatusNotFound, "Usuario no existe")
	}

	if err := c.Bind(&user); err != nil {
		return err
	}

	result := db.DB.Save(&user)

	if result.Error != nil {
		return res.Error
	}

	return c.JSON(http.StatusOK, user)
}

// DELETE USER
func DeleteUser(c echo.Context) error {
	var user models.User
	id := c.Param("id")

	res := db.DB.First(&user, id)
	if res.Error != nil {
		return res.Error
	}

	if user.ID == 0 {
		return c.JSON(http.StatusNotFound, "Usuario no existe")
	}

	result := db.DB.Delete(&user)
	if result.Error != nil {
		return res.Error
	}

	return c.JSON(http.StatusOK, "Usuario eliminado")
}
