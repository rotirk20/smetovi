class Location {
  constructor(
    id,
    name,
    address,
    description,
    longitude,
    latitude,
    userId,
    categoryId,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.description = description;
    this.longitude = longitude;
    this.latitude = latitude;
    this.userId = userId;
    this.categoryId = categoryId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Location;
