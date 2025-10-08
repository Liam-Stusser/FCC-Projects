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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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
-- Name: games_played; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games_played (
    game_id integer NOT NULL,
    player_id integer NOT NULL,
    secret_number integer NOT NULL,
    guesses integer
);


ALTER TABLE public.games_played OWNER TO freecodecamp;

--
-- Name: games_played_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_played_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_played_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_played_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_played_game_id_seq OWNED BY public.games_played.game_id;


--
-- Name: player_data; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.player_data (
    player_id integer NOT NULL,
    username character(22) NOT NULL,
    games_played integer
);


ALTER TABLE public.player_data OWNER TO freecodecamp;

--
-- Name: player_data_player_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.player_data_player_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.player_data_player_id_seq OWNER TO freecodecamp;

--
-- Name: player_data_player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.player_data_player_id_seq OWNED BY public.player_data.player_id;


--
-- Name: games_played game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games_played ALTER COLUMN game_id SET DEFAULT nextval('public.games_played_game_id_seq'::regclass);


--
-- Name: player_data player_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.player_data ALTER COLUMN player_id SET DEFAULT nextval('public.player_data_player_id_seq'::regclass);


--
-- Data for Name: games_played; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games_played VALUES (1, 1, 803, 804);
INSERT INTO public.games_played VALUES (2, 1, 384, 385);
INSERT INTO public.games_played VALUES (3, 2, 244, 245);
INSERT INTO public.games_played VALUES (4, 2, 194, 195);
INSERT INTO public.games_played VALUES (5, 1, 793, 796);
INSERT INTO public.games_played VALUES (6, 1, 736, 737);
INSERT INTO public.games_played VALUES (7, 1, 338, 339);
INSERT INTO public.games_played VALUES (8, 3, 1, 10);
INSERT INTO public.games_played VALUES (9, 3, 107, 9);
INSERT INTO public.games_played VALUES (10, 3, 169, 8);
INSERT INTO public.games_played VALUES (11, 3, 127, 9);
INSERT INTO public.games_played VALUES (12, 3, 384, 10);
INSERT INTO public.games_played VALUES (13, 3, 239, 11);
INSERT INTO public.games_played VALUES (14, 4, 846, 847);
INSERT INTO public.games_played VALUES (15, 4, 267, 268);
INSERT INTO public.games_played VALUES (16, 5, 201, 202);
INSERT INTO public.games_played VALUES (17, 5, 532, 533);
INSERT INTO public.games_played VALUES (18, 4, 91, 94);
INSERT INTO public.games_played VALUES (19, 4, 374, 375);
INSERT INTO public.games_played VALUES (20, 4, 420, 421);
INSERT INTO public.games_played VALUES (21, 6, 860, 861);
INSERT INTO public.games_played VALUES (22, 6, 785, 786);
INSERT INTO public.games_played VALUES (23, 7, 354, 355);
INSERT INTO public.games_played VALUES (24, 7, 115, 116);
INSERT INTO public.games_played VALUES (25, 6, 56, 59);
INSERT INTO public.games_played VALUES (26, 6, 765, 766);
INSERT INTO public.games_played VALUES (27, 6, 478, 479);
INSERT INTO public.games_played VALUES (28, 8, 133, 134);
INSERT INTO public.games_played VALUES (29, 8, 937, 938);
INSERT INTO public.games_played VALUES (30, 9, 751, 752);
INSERT INTO public.games_played VALUES (31, 9, 366, 367);
INSERT INTO public.games_played VALUES (32, 8, 188, 191);
INSERT INTO public.games_played VALUES (33, 8, 584, 585);
INSERT INTO public.games_played VALUES (34, 8, 55, 56);
INSERT INTO public.games_played VALUES (35, 10, 819, 820);
INSERT INTO public.games_played VALUES (36, 10, 54, 55);
INSERT INTO public.games_played VALUES (37, 11, 144, 145);
INSERT INTO public.games_played VALUES (38, 11, 760, 761);
INSERT INTO public.games_played VALUES (39, 10, 809, 812);
INSERT INTO public.games_played VALUES (40, 10, 759, 760);
INSERT INTO public.games_played VALUES (41, 10, 273, 274);


--
-- Data for Name: player_data; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.player_data VALUES (1, 'user_1759893584908    ', NULL);
INSERT INTO public.player_data VALUES (2, 'user_1759893584907    ', NULL);
INSERT INTO public.player_data VALUES (3, 'test                  ', NULL);
INSERT INTO public.player_data VALUES (4, 'user_1759894086870    ', NULL);
INSERT INTO public.player_data VALUES (5, 'user_1759894086869    ', NULL);
INSERT INTO public.player_data VALUES (6, 'user_1759894126375    ', NULL);
INSERT INTO public.player_data VALUES (7, 'user_1759894126374    ', NULL);
INSERT INTO public.player_data VALUES (8, 'user_1759894504798    ', NULL);
INSERT INTO public.player_data VALUES (9, 'user_1759894504797    ', NULL);
INSERT INTO public.player_data VALUES (10, 'user_1759894541892    ', NULL);
INSERT INTO public.player_data VALUES (11, 'user_1759894541891    ', NULL);


--
-- Name: games_played_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_played_game_id_seq', 41, true);


--
-- Name: player_data_player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.player_data_player_id_seq', 11, true);


--
-- Name: games_played games_played_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games_played
    ADD CONSTRAINT games_played_pkey PRIMARY KEY (game_id);


--
-- Name: player_data player_data_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.player_data
    ADD CONSTRAINT player_data_pkey PRIMARY KEY (player_id);


--
-- Name: player_data player_data_username_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.player_data
    ADD CONSTRAINT player_data_username_key UNIQUE (username);


--
-- Name: games_played games_played_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games_played
    ADD CONSTRAINT games_played_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.player_data(player_id);


--
-- PostgreSQL database dump complete
--