1.  SELECT NAME 
    FROM CITY 
    WHERE COUNTRYCODE = 'JPN';

2.  SELECT DISTINCT CITY 
    FROM STATION 
    WHERE (ID % 2) = 0;

3.  SELECT AVG(POPULATION) 
    FROM CITY;

4.  SELECT TOP 1 CAST(LONG_W AS NUMERIC(20,4) ) 
    FROM STATION 
    WHERE LAT_N > 38.7780 
    ORDER BY LAT_N;

5.  SELECT SUM(city.POPULATION)
    FROM CITY AS city 
    LEFT JOIN COUNTRY AS country ON city.CountryCode = country.Code
    WHERE country.CONTINENT = 'Asia'
    GROUP BY country.CONTINENT;

6.  SELECT city.NAME
    FROM CITY AS city 
    LEFT JOIN COUNTRY AS country ON city.CountryCode = country.Code
    WHERE country.CONTINENT = 'Africa';