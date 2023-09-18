package models

import "gorm.io/gorm"

type City struct {
	gorm.Model
	Name         string `json:"nombre"`
	DepartmentId uint   `json:"departamento_id"`
	//Department   Department `json:"departamento"`
}

func (City) TableName() string { return "public.cities" }
