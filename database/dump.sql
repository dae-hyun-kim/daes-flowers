--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL,
    quantity integer,
    totalprice integer
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    email text,
    phonenumber bigint,
    city text,
    state text,
    zip integer,
    expiremonth integer,
    expireyear integer,
    cvv integer
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price, quantity, totalprice) FROM stdin;
1	16	2	2595	\N	\N
2	17	2	2595	\N	\N
3	18	2	2595	\N	\N
4	19	2	2595	\N	\N
5	20	2	2595	\N	\N
6	21	1	2999	\N	\N
7	21	1	2999	\N	\N
8	21	1	2999	\N	\N
9	21	1	2999	\N	\N
10	21	1	2999	\N	\N
11	22	1	2999	\N	\N
12	23	1	2999	\N	\N
13	24	1	2999	\N	\N
14	25	1	2999	\N	\N
15	25	1	2999	\N	\N
16	25	1	2999	\N	\N
17	25	5	9900	\N	\N
18	25	1	2999	\N	\N
19	25	1	2999	\N	\N
20	25	5	9900	\N	\N
21	25	6	830	\N	\N
22	25	4	999	\N	\N
23	26	1	2999	\N	\N
24	26	1	2999	\N	\N
25	26	2	2595	\N	\N
26	26	2	2595	\N	\N
27	26	1	2999	\N	\N
28	26	2	2595	\N	\N
29	26	1	2999	\N	\N
30	26	2	2595	\N	\N
31	26	2	2595	\N	\N
32	26	2	2595	\N	\N
33	26	1	2999	\N	\N
34	26	1	2999	\N	\N
35	26	1	2999	\N	\N
36	26	2	2595	\N	\N
37	26	2	2595	\N	\N
38	26	1	2999	\N	\N
39	26	1	2999	\N	\N
40	26	1	2999	\N	\N
41	26	1	2999	\N	\N
42	26	1	2999	\N	\N
43	26	1	2999	\N	\N
44	26	1	2999	\N	\N
45	26	1	2999	\N	\N
46	26	1	2999	\N	\N
47	26	1	2999	\N	\N
48	26	1	2999	\N	\N
49	26	1	2999	\N	\N
50	26	1	2999	\N	\N
51	26	1	2999	\N	\N
52	26	1	2999	\N	\N
53	26	1	2999	\N	\N
54	26	2	2595	\N	\N
55	26	1	2999	\N	\N
56	26	1	2999	\N	\N
57	26	1	2999	\N	\N
58	26	2	2595	\N	\N
59	26	1	2999	\N	\N
60	27	1	2999	\N	\N
61	27	2	2595	\N	\N
62	28	1	2999	\N	\N
63	28	3	2900	\N	\N
64	29	1	2999	\N	\N
65	29	2	2595	\N	\N
66	29	3	2900	\N	\N
67	30	1	2999	\N	\N
68	31	1	2999	\N	\N
69	32	1	2999	\N	\N
70	33	2	2595	\N	\N
71	34	1	2999	\N	\N
72	35	1	2999	\N	\N
73	36	1	2999	\N	\N
74	37	1	2999	\N	\N
75	38	1	2999	\N	\N
76	38	3	2900	\N	\N
77	38	1	2999	\N	\N
78	39	1	2999	\N	\N
79	39	5	9900	\N	\N
80	40	1	2999	\N	\N
81	40	2	2595	\N	\N
82	40	3	2900	\N	\N
83	40	1	2999	\N	\N
84	41	1	2999	\N	\N
85	42	2	2595	\N	\N
86	42	4	999	\N	\N
87	43	1	2999	\N	\N
88	44	1	2999	\N	\N
89	45	2	2595	\N	\N
90	45	2	2595	\N	\N
91	45	3	2900	\N	\N
92	46	1	2999	\N	\N
93	45	3	2900	\N	\N
94	47	1	2999	\N	\N
95	47	1	2999	\N	\N
96	48	5	9900	\N	\N
97	48	5	9900	\N	\N
98	49	1	2999	\N	\N
99	50	1	2999	\N	\N
100	50	2	2595	\N	\N
101	50	1	2999	\N	\N
188	59	3	299	\N	\N
106	51	3	2900	\N	\N
107	52	1	2999	\N	\N
108	52	2	2595	\N	\N
109	53	4	999	\N	\N
110	53	6	830	\N	\N
111	53	5	9900	\N	\N
376	77	1	299	5	1495
194	60	7	399	\N	\N
195	60	7	399	\N	\N
196	60	2	299	\N	\N
197	61	2	299	\N	\N
374	77	2	299	2	598
375	77	4	399	2	798
305	65	3	299	2	598
306	65	4	399	2	798
206	62	5	399	\N	\N
207	62	15	599	\N	\N
307	65	3	299	1	299
308	65	3	299	1	299
309	65	2	299	1	299
310	65	4	399	1	399
311	66	2	299	2	598
382	78	8	399	3	1197
312	66	2	299	1	299
383	78	4	399	2	798
313	67	4	399	1	399
314	68	5	399	1	399
315	69	4	399	2	798
316	70	4	399	2	798
317	71	4	399	1	399
295	63	5	399	2	798
296	63	7	399	3	1197
318	72	4	399	1	399
294	63	2	299	1	299
319	72	4	399	1	399
297	64	5	399	5	1995
171	55	14	599	\N	\N
172	56	2	299	\N	\N
173	57	3	299	\N	\N
174	57	3	299	\N	\N
175	58	3	299	\N	\N
304	65	8	399	3	1197
333	73	3	299	2	598
334	74	4	399	1	399
335	75	4	399	2	798
336	76	2	299	1	299
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-03-10 16:44:15.09937+00
2	2020-03-10 16:45:53.333924+00
3	2020-03-10 16:46:25.047677+00
4	2020-03-10 16:46:58.012535+00
5	2020-03-10 16:48:31.188478+00
6	2020-03-10 16:49:46.316366+00
7	2020-03-10 16:50:21.478152+00
8	2020-03-10 16:50:34.207128+00
9	2020-03-10 19:36:53.087306+00
10	2020-03-10 19:37:07.680316+00
11	2020-03-10 19:37:49.412237+00
12	2020-03-10 19:39:06.095654+00
13	2020-03-10 19:44:32.388234+00
14	2020-03-10 19:48:07.773523+00
15	2020-03-10 19:48:49.842943+00
16	2020-03-10 19:52:50.524061+00
17	2020-03-10 19:54:39.2111+00
18	2020-03-10 20:04:20.196232+00
19	2020-03-10 20:05:18.939264+00
20	2020-03-10 20:08:12.416629+00
21	2020-03-10 20:14:57.395193+00
22	2020-03-10 20:24:37.4627+00
23	2020-03-10 20:24:40.051359+00
24	2020-03-10 20:24:55.503618+00
25	2020-03-10 20:24:56.759222+00
26	2020-03-10 22:59:45.012936+00
27	2020-03-11 17:31:54.172105+00
28	2020-03-11 18:06:12.383112+00
29	2020-03-11 20:22:04.603775+00
30	2020-03-11 20:59:56.577932+00
31	2020-03-11 21:29:32.612675+00
32	2020-03-11 21:35:30.267059+00
33	2020-03-11 21:41:55.233935+00
34	2020-03-11 21:53:25.064036+00
35	2020-03-11 21:55:15.128225+00
36	2020-03-11 21:55:57.288101+00
37	2020-03-11 22:04:38.609064+00
38	2020-03-11 22:06:52.102613+00
39	2020-03-12 05:06:33.316376+00
40	2020-03-12 22:07:17.206827+00
41	2020-03-13 19:16:49.094991+00
42	2020-03-13 19:23:05.88343+00
43	2020-03-13 19:33:05.264906+00
44	2020-03-13 19:36:39.778359+00
45	2020-03-13 19:37:23.839137+00
46	2020-03-13 19:43:10.710028+00
47	2020-03-13 19:46:06.956627+00
48	2020-03-13 19:50:55.332445+00
49	2020-03-13 19:51:36.141815+00
50	2020-03-13 19:52:31.491618+00
51	2020-03-13 20:18:56.157705+00
52	2020-03-13 22:31:46.833141+00
53	2020-03-13 22:32:04.77648+00
54	2020-03-13 23:21:49.309835+00
55	2020-03-14 22:55:02.93971+00
56	2020-03-16 02:46:01.286233+00
57	2020-03-16 16:34:23.573798+00
58	2020-04-06 18:35:32.430236+00
59	2020-04-07 23:15:38.234155+00
60	2020-04-08 17:03:46.501957+00
61	2020-04-08 18:26:29.180252+00
62	2020-04-08 18:31:13.867771+00
63	2020-04-10 17:13:09.683499+00
64	2020-04-12 05:05:54.628881+00
65	2020-04-13 01:21:09.179326+00
66	2020-04-13 17:41:58.080988+00
67	2020-04-13 19:06:43.18739+00
68	2020-04-13 19:40:42.470061+00
69	2020-04-13 20:11:20.628592+00
70	2020-04-13 21:17:56.627146+00
71	2020-04-13 21:23:42.778012+00
72	2020-04-14 00:24:53.343886+00
73	2020-04-14 17:13:51.999363+00
74	2020-04-14 18:41:01.282545+00
75	2020-04-14 18:45:53.431953+00
76	2020-04-14 18:49:19.912618+00
77	2020-04-14 18:52:06.574047+00
78	2020-04-15 23:24:31.012376+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt", email, phonenumber, city, state, zip, expiremonth, expireyear, cvv) FROM stdin;
1	27	Dae	1	1234 Hello	2020-03-11 17:58:17.316352+00	\N	\N	\N	\N	\N	\N	\N	\N
2	28	Dae	1	1234 Hello World	2020-03-11 18:07:37.128691+00	\N	\N	\N	\N	\N	\N	\N	\N
3	34	Dae Kim	0987	Daes address	2020-03-11 21:53:44.589891+00	\N	\N	\N	\N	\N	\N	\N	\N
4	35	Tim Davis	123456	Tims House	2020-03-11 21:55:28.180191+00	\N	\N	\N	\N	\N	\N	\N	\N
5	38	Jinho	1234	1234 Ave	2020-03-12 05:06:30.9697+00	\N	\N	\N	\N	\N	\N	\N	\N
6	60	Sienna	1234567897	hello ave	2020-04-08 18:07:23.386828+00	\N	\N	\N	\N	\N	\N	\N	\N
7	61	Kevin	808080	1234 fat ave	2020-04-08 18:30:19.193523+00	\N	\N	\N	\N	\N	\N	\N	\N
8	66	Dae Kim	1658168188646815	2144 West 182nd Street\n2	2020-04-13 19:04:59.936717+00	\N	\N	\N	\N	\N	\N	\N	\N
9	67	Dae Kim	1981918911919819	73 Cascade\n73	2020-04-13 19:40:39.262334+00	\N	\N	\N	\N	\N	\N	\N	\N
10	68	Sienna Serrano	1560198181909819	hello blvd	2020-04-13 20:10:58.918512+00	Imabutthole@gmail.com	1234567890	walnut	ca	91789	10	22	5411
11	69	Jong Kim	1854981816518681	test address 	2020-04-13 21:17:32.959094+00	heloo@gmail.com	2132161554	torrance	CA	90504	2	2022	541
12	70	Dae H Kim	5161616518168168	2144 West 182nd Street\n2	2020-04-13 21:22:40.668373+00	daehk4@uci.edu	3106346150	Torrance	CA	90504	3	2022	5415
13	71	Dae H Kim	5375345345345345	2144 West 182nd Street\n2	2020-04-14 00:24:49.096173+00	daehk4@uci.edu	3106346150	Torrance	CA	90504	3	2022	4534
14	72	Dae H Kim	1717817187187187	2144 West 182nd Street\n2	2020-04-14 01:09:12.658705+00	daehk4@uci.edu	3106346150	Torrance	CA	90504	3	2023	5466
15	73	Jong Kim	2318961818618616	24312 41234 sfasdf	2020-04-14 18:40:36.254268+00	kim1584@yahoo.com	2132161554	Torrance	CA	90504	4	2022	5433
16	74	Dae H Kim	4534534534534534	2144 West 182nd Street\n2	2020-04-14 18:43:57.989894+00	daehk4@uci.edu	3106346150	Torrance	CA	90504	2	2022	4345
17	75	Dae H Kim	3737537537537537	2144 West 182nd Street\n2	2020-04-14 18:48:00.748538+00	daehk4@uci.edu	3106346150	Torrance	CA	90504	2	2022	7537
18	76	Dae H Kim	2341234214352354	2144 West 182nd Street\n2	2020-04-14 18:52:01.590185+00	daehk4@uci.edu	3106346150	Torrance	CA	90504	2	2021	2345
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
6	White Orchid	399	/images/white-orchid.png	The white orchid signifies purity and innocence. Fragile yet beautiful, the white orchid adds pure beauty to any bouquet.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
4	White Lily	399	/images/white-lily.png	The white lily comes with 5-7 large petals that add size to your bouquet. Gives off an amazing scent and is a great addition to many bouquets.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
1	Red Rose	299	/images/red-rose.png	The long-stemmed red rose. A perfect addition to any bouquet. The red rose conveys deep emotions, such as love or desire.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
2	White Rose	299	/images/white-rose.png	The long-stemmed white rose. Great for weddings and parties. The white rose symbolizes purity and innocence.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
3	Pink Rose	299	/images/pink-rose.png	The long-stemmed pink rose. Beautiful light pink petals that will definitely add sweetness to your customized bouquet.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
5	Pink Lily	399	/images/pink-lily.png	The pink lily is a great gift to tell someone you love them. Represents love and admiration. A great mothers day gift.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
7	Pink Orchid	399	/images/pink-orchid.png	The pink orchid represents joy and happiness. Commonly seen in gifts on the 14th and 28th wedding anniversary.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
8	White Calla	399	/images/white-calla.png	The white calla is a uniquely shaped flower, yet very beautiful. Its beauty can be seen at both weddings and funerals.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
9	Yellow Calla	399	/images/yellow-calla.png	The yellow calla adds brightness to any bouquet. This will definitely grab the attention of anyone that views it.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
10	White Daisy	499	/images/white-daisy.png	The white daisy is a very popular flower seen all over the world. Representing purity, the white daisy is commonly given to parents of newborns.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
11	Pink Daisy	499	/images/pink-daisy.png	The pink daisy comes in a variety of different pink colors. This flower always adds beauty to the bouquet its added to.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
12	Yellow Daisy	499	/images/yellow-daisy.png	The yellow daisy has beautiful yellow petals that adds brightness to many bouquets. Never can go wrong with yellow daisies.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
13	White Hydrangea	599	/images/white-hydrangea.png	The white hydrangea represents boasting or bragging. These large beautiful flowers are definitely to boast about.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
14	Pink Hydrangea	599	/images/pink-hydrangea.png	The pink hydrangea symbolizes heartfelt emotions. A large flower with many separate petals. Adds volume to any bouquet.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
15	White Snapdragon	599	/images/white-snapdragon.png	The white snapdragon represents graciousness. These long flowers can be stuck into many bouquets and add beauty from above.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
16	Pink Snapdragon	599	/images/pink-snapdragon.png	The pink snapdragon has a long stem with beautiful pink petals. A great addition to many bouquets that want to add some verticality the gift.	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 383, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 78, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 18, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, true);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

