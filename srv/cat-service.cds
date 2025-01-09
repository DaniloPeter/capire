using my.testapp as my from '../db/schema';

service CatalogService {
    @readonly entity Employees as projection on my.Employees;
}
