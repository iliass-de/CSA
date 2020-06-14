# Projektvorschlag Hotel Management System V 1.0
##### Hochschule Worms CSA 151 WS 2018/19

******Gruppe 10
Iliass Hilmi<br>
inf2766@hs-worms.de<br>
Oulid Elbakkari<br>
inf2645@hs-worms.de<br>

##Abstract
Hotel Management System ist eine Web Client/Server-Seitige Anwendung läuft unter NodeJs Umgebung.<br>
Diese Anwendung wird sehr geeignet für die Verwaltung von kleine Hostel, Gast Haus, Appartement und Pensionen.
Es verfügt über eine benutzerfreundliche schnittstelle, wobei  Buchungsoperationen verwaltet werden können.
##Abstract Frontend
Veratwortlicher: Iliass Hilmi<br>
Tools:
1. HTML
2. CSS
3. Bootstrap
4. Javascript ES6
5. EJS Template
6. Postman<br>
Die Oberfäsche basiert auf eine HTML/CSS schnittstelle und werden 
einige Schnittstellen von Bootstrap Bibliothek unterstützt.
Die Anwendung wird für Desktop und Mobile geeignet und besteht aus Zwei wesentlichen Hauptteilen:
* #####Login System:
 Hier werden 2 Seiten erstellt, eine Homepage, die eine Kurze Beschreibung für die App ausgibt und eine Log-In Seite.
* #####Buchung System:
Nach einer Erfolgreichen Einloggen, stehen einige Seiten und funktionen für die Benutzer zu verfügung
*   Navigation Menu: eine einfache und einheitliche Struktur für die Navigation Menu
*   Board Page: hier wird ein Ansicht gezeigt, wo steht Informationen über die reservierte Zimmern und deren Kunden.
*   Der Benutzer hat die Möglichkeit der Verwaltung von Zimmern Z.B Einfügung von einenm neuen Zimmer mit einigen Attributen (Zimmer Type, Zimmer Nummer)
*   Der Benutzer hat auch die möglichkeit, die Eintragung und bearbeitung von neuen und alten Kunden
*   Der Admin kann einen neuen Benutzer einfügen oder anderen Benutzern aus der Anwendung weg lassen.
*   Admin und Benutzern haben immer die möglichkeit ihre Passwörte zu verändern.
*   Logout Menu: durch ein Click auf Log out, wird den Benutzer ausgeloggt 
*   Footer: Informationen und Support

#Wireframe
##Desktop Prototyp

####Homepage

![alt text](public/Images/PVorschlag/test.jpg )







##Aufwandsschätzungen
####Frontend
Varantwortlicher : Iliass Hilmi

| Aufgabe                              | Zeit in Std   | 
| ------------------------------------ |:-------------:| 
| Projekt Spezifikation                |      10        | 
| Festlegung der Funktionalität        |      5        | 
| Design spezifikation                 |      5        | 
| Verfassen des Projektvorschlags      |      6        | 
| **Summer**                            |     **26**         | 
 


####Implementierung
| Aufgabe                              | Zeit in Std   | 
| ------------------------------------ |:-------------:| 
| Entwurf des Design                   |      5        |
| Implemetierung des Design HTML        |      10       |         
| Erweiterung des Design CSS           |      5        | 
| Implmentierung der Funktionen ES6    |      25        | 
| Mobile Ansicht                       |      5        | 
| **Summe**                             |      **50**        | 

 
####Dokumentation und Test


| Aufgabe                                    | Zeit in Std |
|--------------------------------------------|------------:|
| - Design Validierung                       |  5          |
| - Test der Funktionalität                  |  10          |
| - Test auf Mobile                          |  2          |
| - Test auf Desktop                         |  3          |
| - Dokumentation der Api                    |  5          |
| - Dokumentation der Entwicklungsablauf     |  5          |
|                                            |             |
| **Summe**                                  |   **30**    |

#### Zusammenfassung
| Teil                                     | Zeit in Std |
|------------------------------------------|------------:|
| Projektvorbereitung                      |  26         |
| Implementierung                          |  50         |
| Dokumentation / Tests                    |  30         |
|                                          |             |
| **Summe**                                |  **106**    |

## Abstract Server
Verantwortlicher: Oualid EL BAKKARI

## API-Beschreibung
die APIs  werden in unterschidlichen Datei verteilt je nach  funktionalität Kontext,die API, die für 
Employee zustandig sind, werden im "/routes/employee.js" angelegt, zum Beispiel (GET,POST ...).

### `GET /employee`
***router.get('/create',employee_controller.employee_create_get);***
   - GET-Anfrage zum Anlegen eines Mitarbeiters. HINWEIS Dies muss vor der Route für die ID stehen 
      (das heißt Mitarbeiter anzeigen).

***router.get('/:id/update', employee_controller.employee_update_get);***
   - GET Anfrage um employe update zu machen
   
***router.get('/:id/detail', employee_controller.employee_detail);***
   - anfrage nach detaierte informationen über ein User
   
***router.get('/list', employee_controller.employee_list)***
   - anfrage nach Liste alle employee
   
***router.get('/:id/update/password', employee_controller.employee_update_password_get);***
   - Anfrage um password zu aktualisieren
   
***router.get('/login', employee_controller.employee_login_get);***
   - Anfrage für Login
   
### `POST /employee`
   
***router.post('/create', employee_controller.employee_create_post);***
   - Post zum Erstellung ein Employee
   
***router.post('/:id/delete', employee_controller.employee_delete_post);***
   - Post zu löschen ein Employee
   
***router.post('/:id/update', employee_controller.employee_update_post);***
   - POST zu update ein Employee
   
***router.post('/:id/update/password',employee_controller.employee_update_password_post);***   
   - POST zum update Password
   
### `GET /Guest`

***router.get('/create', guest_controller.guest_create_get);***
   - GET-Anfrage zum Erstellen eines Gastes. Dies muss vor der Route für die ID kommen 
     (das heißt Gast anzeigen).

***router.get('/:id/delete', guest_controller.guest_delete_get);***
   - GET Anfrage zum löscen ein Guest
   
***router.get('/:id/update', guest_controller.guest_update_get);***    
   - GET Anfrage um Guest zu aktualisieren 
   
***router.get('/:id/detail', guest_controller.guest_detail);*** 
   - GET Anfrage zum Guest detai anzuzeigen 
   
***router.get('/list', guest_controller.guest_list);***
   - GET Anfrage um eine Liste alle Gueste anzuzeigen 
          

### `POST /Guest`

***router.post('/create', guest_controller.guest_create_post);***
   - Post zum Guest Erstellung 
 
***router.post('/:id/delete', guest_controller.guest_delete_post);***
   - POST zum löschen ein Guest
   
***router.post('/:id/update', guest_controller.guest_update_post);***
   - POST zum Guest information zu updaten    

###`GET /reserve`

***router.post('/:id/update', guest_controller.guest_update_post);***
   - GET Anfrage zum Anlegen einer Reserve. Dies muss vor der Route für 
       die ID (das heißt Anzeige der Reserve) stehen.

***router.get('/:id/update', reserve_controller.reserve_update_get);***
   - GET Anfrage um ein Buchung zu updaten wenn Buchungsinformation geändert werden sind 

***router.get('/:id/detail', reserve_controller.reserve_detail);***
   - GET Anfrage um detai ein Buchung anzuzeigen 
   
***router.get('/list', reserve_controller.reserve_list);***
   - GET Anfrage um liste alle Bunchung anzuzeigen 


###`POST /reserve`

***router.post('/:id/update', guest_controller.guest_update_post);***
   - POST zum Erstellung ein Buchung
 
***router.post('/:id/delete', reserve_controller.reserve_delete_post);***
   -  POST zum löschen ein Bunchung 
   
***router.post('/:id/update', reserve_controller.reserve_update_post);***   
   - POST zum update ein Buchung


###`GET / Room`

***router.get('/create', room_controller.room_create_get);***
   - GET Anfrage zum Erstellen von Raum. HINWEIS Dies muss vor der Route für 
     die ID (das heißt Dem Anzeigeraum) erfolgen.
     
***router.get('/:id/update', room_controller.room_update_get);***
   - GET Anfrage um Room informationen zu updaten 
   
***router.get('/:id/detail',room_controller.room_detail);***  
   - GET Anfrage um detai ein Room anzuzeigen
   
***router.get('/list', room_controller.room_list)***
   - GET Anfrage um eine Liste alle Room anzuzeigen          


###`GET / Room`

***router.post('/create', room_controller.room_create_post);***
   - POST zum Erstellung ein Riim
 
***router.post('/:id/delete', room_controller.room_delete_post);***  
   - POST zu Löschen ein Room
    
***router.post('/:id/update', room_controller.room_update_post);***
   - POST zum Room informationen zu upaten 

## Aufwandsschätzungen


### Backend

Verantwortlicher: Oualid El BAKKARI

#### Projektvorbereitung

| Aufgabe                                    | Zeit in Std |
|--------------------------------------------|------------:|
| - Backend Endpunkte / API - Beschreibung   |   5         |
| - Daten_Bank                               |   3         |
| - Verfassen des Projektvorschlags          |   5         |
| - Login System                             |   5         |
| - Markdown                                 |   2         |
|                                            |             |
| **Summe**                                  |  **20**     |

#### Implementierung und Validierung

| Aufgabe                                  | Zeit in Std |
|------------------------------------------|------------:|
| Setup Framework                          |             |
| - Framework express                      |  5          |
| - Erstellung von API                     |  15         |
| - Daten_Bank Entwurf                     |  5          |
| - Daten_Bank Implementierung             |  10         |
| - User_Login System implementieren       |  15         | 
|                                          |             |
| **Summe**                                |  **50**     |

#### Dokumentation / Tests

| Aufgabe                                    | Zeit in Std |
|--------------------------------------------|------------:|
| - Setup Tests                              |  1          |
| - Test Daten_Bank                          |  3          |
| - Test Lorem-Route                         |  3          |
| - Test Login_System                        |  4          |
| - API-Dokumentation Lorem-Route            |  6          |
| - Dokumentation Lorem-Route                |  8          |
| - Dokumentation Daten_Bank                 |  5          |
|                                            |             |
| **Summe**                                  |   **30**    |


#### Zusammenfassung
| Teil                                     | Zeit in Std |
|------------------------------------------|------------:|
| Projektvorbereitung                      |  20         |
| Implementierung                          |  50         |
| Dokumentation / Tests                    |  30         |
|                                          |             |
| **Summe**                                |  **100**    |
