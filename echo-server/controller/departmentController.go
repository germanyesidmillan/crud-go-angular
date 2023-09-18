package controller

import (
	"echo-server/db"
	"echo-server/models"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GET ALL DEPARTMENTS
func GetDepartments(c echo.Context) error {

	var department []models.Department
	//result := db.DB.Find(&department)
	result := db.DB.Preload("Cities").Find(&department)

	if result.Error != nil {
		fmt.Println("entro al error")
		fmt.Print(result.Error)
	}

	return c.JSON(http.StatusOK, department)
}

// GET ONE DEPARTMENT
func GetDepartment(c echo.Context) error {

	var department models.Department
	id := c.Param("id")

	result := db.DB.First(&department, id)

	if result.Error != nil {
		fmt.Print(result.Error)
	}

	if department.ID == 0 {
		fmt.Print("No existe Departamento")
		return c.JSON(http.StatusNotFound, "Departamento no existe")
	}

	return c.JSON(http.StatusOK, department)
}

// CREATE DEPARTMENT
func CreateDepartment(c echo.Context) error {

	var department models.Department

	if err := c.Bind(&department); err != nil {
		fmt.Println("entro al error")
		return err
	}

	r := db.DB.Create(&department)
	if r.Error != nil {
		return r.Error
	}

	return c.JSON(http.StatusCreated, department)

}

// UPDATE DEPARTMENT
func UpdateDepartment(c echo.Context) error {
	var department models.Department

	fmt.Println("Updating department....")

	id := c.Param("id")

	res := db.DB.First(&department, id)

	fmt.Print(department)

	if res.Error != nil {
		return res.Error
	}

	if department.ID == 0 {
		return c.JSON(http.StatusNotFound, "Departamento no existe")
	}

	if err := c.Bind(&department); err != nil {
		fmt.Println("entro al error")
		return err
	}

	//updated := db.DB.Update(id, &department)
	updated := db.DB.Save(&department)

	if updated.Error != nil {
		return c.JSON(http.StatusBadRequest, "Error al actualizar")
	}

	return c.JSON(http.StatusOK, department)
}

// DELETE DEPARTMENT
func DeleteDepartment(c echo.Context) error {
	var Department models.Department
	id := c.Param("id")

	res := db.DB.First(&Department, id)

	if res.Error != nil {
		fmt.Print(res.Error)
	}

	result := db.DB.Delete(&Department, id)

	if result.Error != nil {
		fmt.Print(result.Error)
	}

	return c.JSON(http.StatusNoContent, "Ciudad eliminada")
}
