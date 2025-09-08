--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.comet (
    comet_id integer NOT NULL,
    name character varying(50) NOT NULL,
    has_tail boolean,
    orbit_period_years integer,
    perihelion_distance numeric(10,3)
);


ALTER TABLE public.comet OWNER TO freecodecamp;

--
-- Name: comets_comet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.comets_comet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comets_comet_id_seq OWNER TO freecodecamp;

--
-- Name: comets_comet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.comets_comet_id_seq OWNED BY public.comet.comet_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    type character varying(30),
    stars_in_billions integer,
    contains_black_holes boolean,
    distance_from_earth_millions_light_year numeric(5,4)
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    planet_id integer NOT NULL,
    tidally_locked boolean NOT NULL,
    diameter_km integer NOT NULL,
    composition text,
    orbital_period_days numeric(8,2)
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moons_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moons_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moons_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moons_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moons_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30) NOT NULL,
    size_km integer,
    earth_masses numeric(6,0),
    ly_from_sun numeric(6,0),
    type text,
    orbit_distance_au numeric(6,0),
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planets_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planets_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planets_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planets_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planets_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    galaxy_id integer NOT NULL,
    type character varying(30),
    solar_masses integer,
    variable boolean,
    age_millions numeric(6,0)
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: stars_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.stars_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stars_star_id_seq OWNER TO freecodecamp;

--
-- Name: stars_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.stars_star_id_seq OWNED BY public.star.star_id;


--
-- Name: comet comet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.comet ALTER COLUMN comet_id SET DEFAULT nextval('public.comets_comet_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moons_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planets_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.stars_star_id_seq'::regclass);


--
-- Data for Name: comet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.comet VALUES (1, 'Halleys Comet', true, 72, 0.590);
INSERT INTO public.comet VALUES (2, 'Hale-Bopp Comet', true, 2533, 0.914);
INSERT INTO public.comet VALUES (3, 'Hyakutake', true, 110073, 0.230);
INSERT INTO public.comet VALUES (4, 'McNaught Comet', true, 92663, 0.170);
INSERT INTO public.comet VALUES (5, 'Great Comet of 1882', true, 760, 0.003);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 'Barred-Spiral', 250, true, 0.0265);
INSERT INTO public.galaxy VALUES (2, 'Canis Major Dwarf', 'Irregular', 1, true, 0.0250);
INSERT INTO public.galaxy VALUES (4, 'Segue-1', 'Dwarf Spherical', 0, true, 0.0750);
INSERT INTO public.galaxy VALUES (5, 'Large Magellanic Cloud', 'Irregular', 30, true, 0.1580);
INSERT INTO public.galaxy VALUES (6, 'Small Magellanic Cloud', 'Irregular', 3, false, 0.2000);
INSERT INTO public.galaxy VALUES (3, 'Sagittarius', 'Dwarf Elliptical', 0, true, 0.0700);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'the Moon', 3, true, 3476, 'mixed', 27.00);
INSERT INTO public.moon VALUES (2, 'Phobos', 4, true, 22, 'rocky', 0.33);
INSERT INTO public.moon VALUES (3, 'Deimos', 4, true, 12, 'rocky', 1.25);
INSERT INTO public.moon VALUES (4, 'Ganymede', 5, true, 5262, 'mixed', 7.00);
INSERT INTO public.moon VALUES (5, 'Io', 5, true, 3643, 'Silicate', 1.77);
INSERT INTO public.moon VALUES (6, 'Callisto', 5, true, 4821, 'mixed', 17.00);
INSERT INTO public.moon VALUES (7, 'Europa', 5, true, 3121, 'Ice', 3.54);
INSERT INTO public.moon VALUES (8, 'Himalia', 5, false, 170, 'Iron', 251.00);
INSERT INTO public.moon VALUES (9, 'Elara', 5, false, 86, 'rocky', 259.00);
INSERT INTO public.moon VALUES (10, 'Themisto', 5, false, 8, 'mixed', 130.00);
INSERT INTO public.moon VALUES (11, 'Titan', 6, true, 5149, 'rock-ice', 16.00);
INSERT INTO public.moon VALUES (12, 'Rhea', 6, true, 1527, 'ice', 4.52);
INSERT INTO public.moon VALUES (13, 'Iapetus', 6, true, 1469, 'ice', 79.00);
INSERT INTO public.moon VALUES (14, 'Hyperion', 6, false, 270, 'water-ice', 21.00);
INSERT INTO public.moon VALUES (15, 'Titania', 7, true, 1578, 'rock-ice', 8.70);
INSERT INTO public.moon VALUES (16, 'Oberon', 7, true, 1523, 'rock-ice', 13.00);
INSERT INTO public.moon VALUES (17, 'Umbriel', 7, true, 1169, 'rock-ice', 4.10);
INSERT INTO public.moon VALUES (18, 'Triton', 8, true, 2706, 'mixed', 5.88);
INSERT INTO public.moon VALUES (19, 'Proteus', 8, true, 420, 'rock-ice', 1.13);
INSERT INTO public.moon VALUES (20, 'Nereid', 8, false, 340, 'rock-ice', 360.00);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 4879, 0, 0, 'Terrestial', 0, 4);
INSERT INTO public.planet VALUES (2, 'Venus', 12104, 1, 0, 'Terrestial', 1, 4);
INSERT INTO public.planet VALUES (3, 'Earth', 12742, 1, 0, 'Rocky', 1, 4);
INSERT INTO public.planet VALUES (4, 'Mars', 6779, 0, 0, 'Rocky', 2, 4);
INSERT INTO public.planet VALUES (5, 'Jupiter', 139820, 318, 0, 'Gas Giant', 5, 4);
INSERT INTO public.planet VALUES (6, 'Saturn', 116460, 95, 0, 'Gas Giant', 10, 4);
INSERT INTO public.planet VALUES (7, 'Uranus', 50724, 15, 0, 'Ice Giant', 19, 4);
INSERT INTO public.planet VALUES (8, 'Neptune', 49244, 17, 0, 'Ice Giant', 30, 4);
INSERT INTO public.planet VALUES (9, 'Proxima Centauri b', 13761, 1, 4, 'Rocky/Earth', 0, 12);
INSERT INTO public.planet VALUES (10, 'Trappist-1 e', 11595, 1, 40, 'Rocky/Earth', 0, 13);
INSERT INTO public.planet VALUES (11, 'Kepler-442 b', 17074, 2, 1206, 'Super-Earth', 0, 14);
INSERT INTO public.planet VALUES (12, 'LHS 1140 b', 21661, 7, 40, 'Super-Earth', 0, 15);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'UY SCUTI', 1, 'Red Super Giant', 8, true, 15);
INSERT INTO public.star VALUES (2, 'VY Canis Majoris', 1, 'Red Hyper Giant', 17, true, 10);
INSERT INTO public.star VALUES (5, 'WOH G64', 5, 'Yellow Hyper Giant', 28, false, 0);
INSERT INTO public.star VALUES (6, 'LMC X-1', 5, 'High Mass X-Ray Binary', 42, false, 0);
INSERT INTO public.star VALUES (7, 'BAT99-7', 5, 'Wolf Rayet', 25, NULL, NULL);
INSERT INTO public.star VALUES (8, 'HD 33579', 5, 'White/Yellow Hyper Giant', 25, true, 4);
INSERT INTO public.star VALUES (9, 'NGC 346', 6, 'Young Cluster', 100, true, 4);
INSERT INTO public.star VALUES (10, 'LHA 120-N 150', 6, 'Star Forming Region', 50, NULL, 2);
INSERT INTO public.star VALUES (11, 'HD 269810', 6, 'O2III', 130, NULL, 2);
INSERT INTO public.star VALUES (12, 'Proxima Centauri', 1, 'Dim Red Dwarf', 4, true, 4850);
INSERT INTO public.star VALUES (13, 'Trappist-1', 1, 'Ultra-Cool Red Dwarf', 0, false, 5400);
INSERT INTO public.star VALUES (15, 'LHS-1140', 1, 'Red Dwarf', 0, true, 5000);
INSERT INTO public.star VALUES (4, 'Sun', 1, 'G Yellow Dwarf', 1, true, 4600);
INSERT INTO public.star VALUES (3, 'RW Cephei', 1, 'K Hypergiant', 35, true, 12300);
INSERT INTO public.star VALUES (14, 'Kepler-442', 1, 'K Main Sequence', 0, true, 2900);


--
-- Name: comets_comet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.comets_comet_id_seq', 5, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moons_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moons_moon_id_seq', 20, true);


--
-- Name: planets_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planets_planet_id_seq', 12, true);


--
-- Name: stars_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.stars_star_id_seq', 15, true);


--
-- Name: comet comets_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.comet
    ADD CONSTRAINT comets_name_key UNIQUE (name);


--
-- Name: comet comets_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.comet
    ADD CONSTRAINT comets_pkey PRIMARY KEY (comet_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moons_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moons_name_key UNIQUE (name);


--
-- Name: moon moons_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moons_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planets_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planets_name_key UNIQUE (name);


--
-- Name: planet planets_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planets_pkey PRIMARY KEY (planet_id);


--
-- Name: star stars_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT stars_name_key UNIQUE (name);


--
-- Name: star stars_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT stars_pkey PRIMARY KEY (star_id);


--
-- Name: moon moons_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moons_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planets_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planets_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star stars_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT stars_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--