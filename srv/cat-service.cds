using my.testapp as my from '../db/schema';

service CatalogService {
    entity Employees as projection on my.Employees;
    entity TempEmployees as projection on my.TempEmployees;
    action deleteAndBackup() returns {deleted : Integer};
    action restoreFromBackup() returns {restored : Integer}
}
