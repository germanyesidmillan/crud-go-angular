package models

import "gorm.io/gorm"

type Department struct {
	gorm.Model
	Name   string `gorm:"not null" json:"nombre"`
	Cities []City `json:"ciudades"`
}

func (Department) TableName() string { return "public.departments" }
