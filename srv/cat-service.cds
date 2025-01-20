using my.testapp as my from '../db/schema';

service CatalogService {
    entity Employees as projection on my.Employees;
}
