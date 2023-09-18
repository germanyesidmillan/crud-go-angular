package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	NumberId int64  `gorm:"not null" json:"number_id"`
	Name     string `gorm:"not null" json:"nombre"`
	LastName string `gorm:"not null" json:"apellido"`
	Email    string `gorm:"not null" json:"correo"`
	CiudadId uint   `gorm:"foreignKey:ciudad_id" gorm:"not null" json:"ciudad_id"`
	City     City   `gorm:"foreignKey:ciudad_id" json:"ciudad"`
}

type City2 struct {
	//gorm.Model
	ID   uint   `json:"ID"`
	Name string `json:"nombre"`
}

type UserResponse struct {
	ID       uint   `json:"ID"`
	NumberId int64  `json:"number_id"`
	Name     string `json:"nombre"`
	LastName string `json:"apellido"`
	Email    string `json:"correo"`
	CiudadId uint   `json:"ciudad_id"`
	//NombreCiudad string `json:"nombre_ciudad"`
	//DepartmentId uint       `gorm:"foreignKey:department_id json:"depto_id"`
	City City `gorm:"foreignKey:ciudad_id" json:"ciudad"`
	//Department Department `gorm:"foreignKey:id" json:"depatment"`
	//Cities string `json:"ciudades"`
}

func (User) TableName() string { return "public.users" }
