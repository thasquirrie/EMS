class APIFeatures {
 constructor(query, queryString) {
  this.query = query;
  this.queryString = queryString;
 }
 filter() {
  let queryObj = { ...this.queryString };
  const excludedFields = ['sort', 'field', 'page', 'limit'];
  excludedFields.forEach((field) => delete queryObj[field]);

  let queryObjStr = JSON.stringify(queryObj);
  queryObjStr = queryObjStr.replace(
   /\b(lt|lte|gt|gte)\b/g,
   (match) => `$${match}`
  );

  this.query = this.query.find(JSON.parse(queryObjStr));

  return this;
 }
 sort() {
  if (this.queryString.sort) {
   const sortItems = this.queryString.sort.split(',').join(' ');
   this.query = this.query.sort(sortItems);
  } else {
   this.query = this.query.sort('-dateCreated');
  }

  return this;
 }

 field() {
  if (this.queryString.fields) {
   const field = this.queryString.fields.split(',').join(' ');
   this.query = this.query.select(field);
  } else {
   this.query = this.query.sort('-dateCreated');
  }

  return this;
 }
 paginate() {
  const page = this.queryString.page || 1;
  const limit = this.queryString.limit || 50;
  const skip = (page - 1) * limit;

  this.query = this.query.skip(skip).limit(limit);

  return this;
 }
}

module.exports = APIFeatures;
