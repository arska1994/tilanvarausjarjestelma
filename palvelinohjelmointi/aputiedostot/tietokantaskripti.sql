--
-- Sähköisen palvelun suunnittelu ja toteutus, ryhmä E
-- Tilanvarausjärjestelmän tietokantaskripti
-- Viimeksi muokattu: 14.11.2017
--

CREATE DATABASE IF NOT EXISTS tilanvaraus_ryhma_e;
USE tilanvaraus_ryhma_e;

--
-- Taulun 'asiakastiedot' määritykset
--

DROP TABLE IF EXISTS asiakastiedot;
CREATE TABLE asiakastiedot (
	id INT NOT NULL AUTO_INCREMENT,
	etunimi varchar(255) NOT NULL,
	sukunimi varchar(255) NOT NULL,
	postiosoite varchar(255) NOT NULL,
	postinumero varchar(5) NOT NULL,
	postitoimipaikka varchar(255) NOT NULL,
	puhelinnumero varchar(10) NOT NULL,
	sahkoposti varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO asiakastiedot (etunimi, sukunimi, postiosoite, postinumero, postitoimipaikka, puhelinnumero, sahkoposti) VALUES 
('Mikko', 'Mallikas', 'Mikkelinkatu 1', '50100', 'Mikkeli', '0457894567', 'mikko.mallikas@mikkeli.fi');

--
-- Taulun 'oheispalvelutiedot' määritykset
--

DROP TABLE IF EXISTS oheispalvelutiedot;
CREATE TABLE oheispalvelutiedot (
	id INT NOT NULL AUTO_INCREMENT,
	ruoka boolean NOT NULL,
	kahvi boolean NOT NULL,
	siivous boolean NOT NULL,
	vahtimestari boolean NOT NULL,
	itTuki boolean NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO oheispalvelutiedot (ruoka, kahvi, siivous, vahtimestari, itTuki) VALUES 
(true, true, true, true, true);

--
-- Taulun 'tilatiedot' määritykset
--

DROP TABLE IF EXISTS tilatiedot;
CREATE TABLE tilatiedot (
	id INT NOT NULL AUTO_INCREMENT,
	nimi varchar(255) NOT NULL,
	kuvausteksti varchar(255) NOT NULL,
	koko INT NOT NULL,
	sijainti varchar(255) NOT NULL,
	laitteet TEXT NOT NULL,
	hinta INT NOT NULL,
	saatavuus boolean NOT NULL,
	palveluId INT,
	PRIMARY KEY (id),
	FOREIGN KEY (palveluId) REFERENCES oheispalvelutiedot(id)
);

INSERT INTO tilatiedot (nimi, kuvausteksti, koko, sijainti, laitteet, hinta, saatavuus, palveluId) VALUES 
('Mikpolisali', 'Mikkelin kampuksen  esitysauditorio, jossa on 117 kiinteää istumapaikkaa. Salissa on erinomainen kuva-, ääni- ja tietojärjestelmä.', 117, 'Mikpoli-rakennus, Patteristonkatu 2, Mikkeli', 'dataprojektori, 1920 x 1080. internetyhteys (kiinteä ja WLAN). kiinteä tietokone nettiyhteydellä, mahdollisuus myös ulkopuoliselle tietokoneelle. useita liitäntöjä tietokoneille (VGA, HDMI). blu-ray -soitin. digiTV. videoneuvottelulaite, 4 pisteen siltayhteydet. dokumenttikamera. langattomat mikrofonit, 4 kpl. kiinteät mikrofonit, 3 kpl. piano.', 160, true, 1),
('Kuitula', 'Mikpolissa sijaitseva kokoustila, johon mahtuu 22 henkilöä. Kokoustilan lisäksi Kuitulassa on saunatilat.', 22, 'Mikpoli-rakennus, Patteristonkatu 2, Mikkeli', 'pc, mahdollisuus ulkopuoliselle pc:lle. internetyhteys (kiinteä + WLAN). dataprojektori. videoneuvottelulaitteisto, 4 pisteen siltayhteydet. digiTV. Blu-ray -soitin. heijastava seinä. fläppitaulu', 200, true, 1),
('Tallin Vintti', 'Kokoustila 40 henkilölle.', 40, 'Ravintola Talli, Patteristonkatu 2, Mikkeli', 'pc. internetyhteys (WLAN). dataprojektori. valkokangas. fläppitaulu', 90, true, 1),
('MA325-koulutustila', 'Mikpolissa sijaitseva koulutustila', 0, 'Patteristonkatu 2, Mikpoli-rakennus, 3. krs. Mikkeli', 'Ei laitetietoja', 80, false, 1),
('MB124-kokoustila', 'Kokoustilaan mahtuu 14 henkilöä.', 14, 'Patteristonkatu 2, Mikpoli-rakennus, 1. krs. Mikkeli', 'pc. internetyhteys (kiinteä + WLAN). kiinteä skype-kamera. dataprojektori. valkokangas. fläppitaulu', 60, true, 1);




--
-- Taulun 'varaustiedot' määritykset
--

DROP TABLE IF EXISTS varaustiedot;
CREATE TABLE varaustiedot (
	id INT NOT NULL AUTO_INCREMENT,
	tilaId INT NOT NULL,
	asiakasId INT NOT NULL,
	kesto INT NOT NULL,
	paivamaara DATE NOT NULL,
	maksuId varchar(255) NOT NULL,
	korttitunnus varchar(255) NOT NULL,
	maksutapa varchar(255) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (asiakasId) REFERENCES asiakastiedot(id),
	FOREIGN KEY (tilaId) REFERENCES tilatiedot(id)
);

INSERT INTO varaustiedot (tilaId, asiakasId, kesto, paivamaara, maksuId, korttitunnus, maksutapa) VALUES 
(1, 1, 2, '2017-11-13', 123, 1234567812345678, 'verkkopankki');

--
-- Taulun 'yllapitotiedot' määritykset
--

DROP TABLE IF EXISTS yllapitotiedot;
CREATE TABLE yllapitotiedot (
	id INT NOT NULL AUTO_INCREMENT,
	tunnus varchar(255) NOT NULL,
	salasana varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO yllapitotiedot (tunnus, salasana) VALUES 
('Emil Aurala', 'kissakala');