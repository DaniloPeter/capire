# SAPUI5 CAP Server-Side Rendering

This project demonstrates a **Server-Side Rendering (SSR)** implementation using SAP's Cloud Application Programming Model (CAP) and SAPUI5.

## Project Structure

```
capire/
├── app/
│   └── serverside-rendering/     # SAPUI5 frontend application
│       ├── webapp/               # UI5 application files
│       ├── package.json          # Frontend dependencies
│       └── ui5.yaml             # UI5 build configuration
├── db/
│   ├── schema.cds               # CAP data model definitions
│   └── data/                    # Sample data files
│       ├── my.testapp-Employees.csv
│       └── my.testapp-TempEmployees.csv
├── srv/
│   ├── cat-service.cds          # Service definitions
│   ├── cat-service.js           # Service implementation
│   └── views/                   # Service views
├── test/                        # Test files
├── package.json                 # Main project configuration
└── mta.yaml                     # Multi-Target Application configuration
```

- **Backend**: SAP Cloud Application Programming Model (CAP)
- **Frontend**: SAPUI5 1.124.0 with TypeScript
- **Database**: SQLite
- **Build Tools**: UI5 Tooling, CDS Development Kit
- **Server-Side Rendering**: `ui5-cap-serverside-rendering-plugin`

### 1. Install Dependencies

```bash
npm install
```

### 2. Deploy Database Schema

```bash
cds deploy
```

### 3. Start the Application

```bash
npm start
```

### 4. Access the Application

- **CAP Service**: http://localhost:4004/odata/v4/catalog/
- **UI5 Application**: http://localhost:4004/be.wl.serversiderendering/index.html
- **OData v2**: http://localhost:4004/odata/v2/catalog/

## Data Model

The application manages employee data with the following entities:

### Employees Entity

- **ID**: Primary key (Integer)
- **Personal Info**: FirstName, LastName, Title, TitleOfCourtesy
- **Dates**: BirthDate, HireDate
- **Contact**: Address, City, Region, PostalCode, Country, HomePhone, Extension
- **Additional**: Notes, ReportsTo

### TempEmployees Entity

- Backup entity with identical structure for data management operations

## Available Services

### CatalogService

- **Employees**: CRUD operations for employee data
- **TempEmployees**: Backup employee data management
- **deleteAndBackup(n)**: Deletes n employees and backs them up
- **restoreFromBackup()**: Restores employees from backup

### Local Development

```bash
cds watch
```
