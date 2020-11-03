--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: credit_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.credit_status_enum AS ENUM (
    'QUITADO',
    'ABERTO',
    'ENCERRADO'
);


ALTER TYPE public.credit_status_enum OWNER TO postgres;

--
-- Name: expense_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.expense_type_enum AS ENUM (
    'RECEITA',
    'DESPESA'
);


ALTER TYPE public.expense_type_enum OWNER TO postgres;

--
-- Name: recipe_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.recipe_type_enum AS ENUM (
    'RECEITA',
    'DESPESA'
);


ALTER TYPE public.recipe_type_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: credit; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.credit (
    id integer NOT NULL,
    holder character varying(60) NOT NULL,
    value double precision NOT NULL,
    telephone character varying(15),
    "registeredIn" timestamp without time zone DEFAULT now() NOT NULL,
    status public.credit_status_enum DEFAULT 'ABERTO'::public.credit_status_enum,
    "recipeId" integer
);


ALTER TABLE public.credit OWNER TO postgres;

--
-- Name: credit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_id_seq OWNER TO postgres;

--
-- Name: credit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credit_id_seq OWNED BY public.credit.id;


--
-- Name: expense; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.expense (
    id integer NOT NULL,
    description character varying(60) NOT NULL,
    value double precision NOT NULL,
    "registeredIn" timestamp without time zone DEFAULT '2020-11-03 15:47:27.423'::timestamp without time zone NOT NULL,
    details character varying(255),
    type public.expense_type_enum NOT NULL,
    "treasuryId" integer
);


ALTER TABLE public.expense OWNER TO postgres;

--
-- Name: expense_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expense_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expense_id_seq OWNER TO postgres;

--
-- Name: expense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expense_id_seq OWNED BY public.expense.id;


--
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.inventory (
    id integer NOT NULL,
    "actualBalance" double precision NOT NULL,
    "currentBalance" double precision,
    discrepancy double precision,
    "registeredIn" timestamp without time zone DEFAULT '2020-11-03 15:47:27.43'::timestamp without time zone NOT NULL,
    "treasuryId" integer
);


ALTER TABLE public.inventory OWNER TO postgres;

--
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_id_seq OWNER TO postgres;

--
-- Name: inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventory_id_seq OWNED BY public.inventory.id;


--
-- Name: recipe; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.recipe (
    id integer NOT NULL,
    description character varying(60) NOT NULL,
    value double precision NOT NULL,
    offerer character varying(60),
    type public.recipe_type_enum NOT NULL,
    "registeredIn" timestamp without time zone DEFAULT '2020-11-03 15:47:27.428'::timestamp without time zone NOT NULL,
    details character varying(255),
    "treasuryId" integer
);


ALTER TABLE public.recipe OWNER TO postgres;

--
-- Name: recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipe_id_seq OWNER TO postgres;

--
-- Name: recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipe_id_seq OWNED BY public.recipe.id;


--
-- Name: treasury; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.treasury (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    "initialAmount" double precision NOT NULL,
    "currentBalance" double precision DEFAULT 0,
    "incomeRecipes" double precision DEFAULT 0,
    "incomeExpenses" double precision DEFAULT 0,
    details character varying(255),
    "userId" integer NOT NULL,
    updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.treasury OWNER TO postgres;

--
-- Name: treasury_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.treasury_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.treasury_id_seq OWNER TO postgres;

--
-- Name: treasury_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.treasury_id_seq OWNED BY public.treasury.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(15) NOT NULL,
    surname character varying(15) NOT NULL,
    email character varying(30) NOT NULL,
    username character varying(15) NOT NULL,
    password character varying(15) NOT NULL,
    whatzapp character varying(15) NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "codeVerify" character varying NOT NULL,
    updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit ALTER COLUMN id SET DEFAULT nextval('public.credit_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense ALTER COLUMN id SET DEFAULT nextval('public.expense_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe ALTER COLUMN id SET DEFAULT nextval('public.recipe_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.treasury ALTER COLUMN id SET DEFAULT nextval('public.treasury_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: credit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credit (id, holder, value, telephone, "registeredIn", status, "recipeId") FROM stdin;
\.


--
-- Name: credit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credit_id_seq', 1, false);


--
-- Data for Name: expense; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expense (id, description, value, "registeredIn", details, type, "treasuryId") FROM stdin;
1	Pagamento da mensalidade da bateria eletrônica	230	2020-01-22 00:00:00	Esse retirada foi destinada ao pagamento da mensalidade da bateria eletrônica	DESPESA	1
2	Pagamento da mensalidade da bateria eletrônica	237	2020-02-10 00:00:00	Esse retirada foi destinada ao segundo pagamento referente a mensalidade da bateria eletrônica	DESPESA	1
3	Pagamento da mensalidade da bateria eletrônica	213	2020-03-10 00:00:00	Esse retirada foi destinada ao terceiro pagamento referente a mensalidade da bateria eletrônica	DESPESA	1
4	Pagamento da mensalidade dos pratos da bateria eletrônica	235	2020-04-14 00:00:00	Essa retirada foi dedicada ao pagamento da primeira mensalidade referente aos pratos da bateria eletrônica	DESPESA	1
5	Pagamento da mensalidade dos pratos da bateria	75	2020-06-18 00:00:00	Essa retirada foi destinada ao pagamento da segunda mensalidade da bateria eletrônica	DESPESA	1
6	Pagamento da mensalidade dos pratos da bateria	75	2020-07-10 00:00:00	Essa retirada foi destinada ao terceiro pagamento referente a compra dos pratos da bateria eletrônica	DESPESA	1
7	Conserto de microfones	50	2020-07-26 00:00:00	Essa retirada foi destinada ao pagamento do conserto dos microfones	DESPESA	1
8	Pagamento de emprestimo	50	2020-08-10 00:00:00	Essa retirada se refere aos dois empréstimos feitos pelo Joabe	DESPESA	1
9	Pagamento da primeira parcela do contra-baixo	50	2020-08-11 00:00:00	Essa retirada se refere ao pagamento da primeira parcela referente ao pagamento do contra-baixo	DESPESA	1
10	Pagamento da quarta mensalidade dos pratos da bateria	75	2020-08-11 00:00:00	Essa retirada foi destinada ao pagamento da quarta parcela referente a compra dos pratos da bateria	DESPESA	1
11	Pagamento da mensalidade dos pratos da bateria	75	2020-09-04 00:00:00	Essa retirada foi destinada ao pagamento da quinta parcela referente a compra dos pratos da bateria eletrônica	DESPESA	1
12	Compra de um cabo	45	2020-09-04 00:00:00	Essa retirada foi destinada a compra de um cabo do tipo p10 para o contra-baixo	DESPESA	1
13	Conserto de microfones	50	2020-09-06 00:00:00	Essa retirada foi destinada ao conserto dos microfones	DESPESA	1
14	Pagamento de empréstimo	50	2020-10-19 00:00:00	Essa retirada foi destinada ao pagamento do empréstimo feito pelo pastor Gerôncio	DESPESA	1
15	Pagamento da parcela do contra-baixo	50	2020-10-19 00:00:00	Essa retirada foi destinada ao pagamento da segunda mensalidade referente a compra do contra-baixo	DESPESA	1
16	Empréstimo para a banda músical	70	2020-01-19 00:00:00	Essa retirada se refere a um empréstimo feito para a banda musical	DESPESA	2
18	Impressão de hinos	5	2020-02-15 00:00:00	Essa despesa se refere a impressão de hinos para a mocidade	DESPESA	2
17	Impressão de hinos	25	2020-01-25 00:00:00	Essa despesa se refere a impressão de hinos para a mocidade	DESPESA	2
19	Empréstimo para a banda musical	22	2020-03-11 00:00:00	Essa retirada se refere a um empréstimo feito para a banda musical	DESPESA	2
20	Empréstimo para a banda musical	20.25	2020-04-14 00:00:00	Esse despesa se refere a um empréstimo feito para a banda musical	DESPESA	2
21	Ajuda na compra do contra-baixo	200	2020-04-17 00:00:00	Essa retirada foi dedicada para complementar a compra do contrabaixo da Igreja	DESPESA	2
22	Ajuda no combustível	40	2020-09-05 00:00:00	Essa retirada se refere a uma ajuda para complementar o abastecimento dos transportes na viagem da mocidade	DESPESA	2
\.


--
-- Name: expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expense_id_seq', 22, true);


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory (id, "actualBalance", "currentBalance", discrepancy, "registeredIn", "treasuryId") FROM stdin;
1	545.60000000000002	545.60000000000002	0	2020-11-01 00:00:00	1
2	728.04999999999995	728	0.049999999999954525	2020-10-27 00:00:00	2
3	969.54999999999995	969	0.54999999999995453	2020-11-01 00:00:00	2
\.


--
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventory_id_seq', 3, true);


--
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") FROM stdin;
2	Venda da banda	124.3	\N	RECEITA	2020-01-19 00:00:00	\N	1
1	Venda da banda	163.84999999999999	\N	RECEITA	2020-01-12 00:00:00	\N	1
3	Oferta recebida do departamento de mocidade	70	\N	RECEITA	2020-01-22 00:00:00	Essa oferta foi recebida para complementar a quantia referente a mensalidade da compra da bateria eletrônica	1
4	Venda da banda	181	\N	RECEITA	2020-02-09 00:00:00	\N	1
5	Venda da banda	124	\N	RECEITA	2020-02-15 00:00:00	Nessa venda foi vendido somente lanches	1
6	Oferta recebida do departamento de mocidade	22	\N	RECEITA	2020-03-11 00:00:00	Oferta recebida para complementar o último pagamento referente a mensalidade da bateria eletrônica	1
7	Venda da banda	209.59999999999999	\N	RECEITA	2020-03-15 00:00:00	Nessa venda foi vendido somente lanches	1
8	Oferta recebida do departamento de mocidade	20.25	\N	RECEITA	2020-04-14 00:00:00	Oferta recebida para complementar o pagamento da primeira mensalidade dos pratos da bateria eletrônica	1
9	Oferta vonlutária	25	José Joabe de Sousa Amorim	RECEITA	2020-06-18 00:00:00	Oferta recebida para efetuar o pagamento da mensalidade dos pratos da bateria eletrônica	1
10	Oferta voluntária	50	Pastor Gerôncio Sousa Sales	RECEITA	2020-06-18 00:00:00	Oferta recebida para o segundo pagamento referente aos pratos da bateria eletrônica	1
11	Oferta voluntária	25	José Joabe de Sousa Amorim	RECEITA	2020-07-10 00:00:00	Essa oferta foi recebida para o pagamento da terceira mensalidade dos pratos da bateria eletrônica	1
12	Oferta Voluntária	50	Pastor Gerôncio Sousa Sales	RECEITA	2020-07-10 00:00:00	Essa oferta foi recebida para o pagamento da terceira mensalidade referente aos pratos da bateria eletrônica	1
13	Venda da banda	178	\N	RECEITA	2020-07-19 00:00:00	\N	1
14	Venda da banda	202.5	\N	RECEITA	2020-07-26 00:00:00	\N	1
15	Venda da banda	170	\N	RECEITA	2020-08-16 00:00:00	\N	1
16	Venda da banda	261	\N	RECEITA	2020-09-27 00:00:00	\N	1
17	Venda da banda	217	\N	RECEITA	2020-10-25 00:00:00	\N	1
18	Oferta do culto	22.699999999999999	\N	RECEITA	2020-01-11 00:00:00	Oferta do primeiro culto de mocidade de 2020	2
19	Venda da mocidade	179.5	\N	RECEITA	2020-01-19 00:00:00	\N	2
20	Recebimento de débitos	10	\N	RECEITA	2020-01-26 00:00:00	Essa receita refere-se ao recebimento de dois débitos da primeira venda realizada pela mocidade	2
21	Oferta do culto 	12.050000000000001	\N	RECEITA	2020-02-08 00:00:00	Esse receita refere-se as ofertas recebidas do segundo culto de jovens de 2020	2
22	Venda da mocidade	114	\N	RECEITA	2020-02-16 00:00:00	\N	2
23	Venda da banda	31.25	\N	RECEITA	2020-03-14 00:00:00	\N	2
24	Oferta do culto	22.050000000000001	\N	RECEITA	2020-07-11 00:00:00	Essa receita se refere as ofertas tiradas no primeiro culto de mocidade após o lockdown causado pela crise do corona vírus 	2
25	Oferta do culto	23.449999999999999	\N	RECEITA	2020-08-08 00:00:00	Essa retirada se refere as ofertas do culto de mocidade	2
26	Venda dos jovens	167	\N	RECEITA	2020-08-30 00:00:00	\N	2
27	Oferta do culto	98.799999999999997	\N	RECEITA	2020-09-12 00:00:00	Essa despesa se refere as ofertas do culto de jovens	2
28	Venda dos jovens	243.75	\N	RECEITA	2020-09-20 00:00:00	\N	2
29	Oferta do culto	31.100000000000001	\N	RECEITA	2020-10-10 00:00:00	Essa despesa se refere as ofertas do culto de mocidade	2
30	Venda dos jovens	241.5	\N	RECEITA	2020-11-01 00:00:00	\N	2
\.


--
-- Name: recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipe_id_seq', 30, true);


--
-- Data for Name: treasury; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.treasury (id, name, "initialAmount", "currentBalance", "incomeRecipes", "incomeExpenses", details, "userId", updated) FROM stdin;
2	Tesouraria dos Jovens	154.65000000000001	969.54999999999995	1197.1500000000001	382.25	Essa tesouraria é dedicada às finanças do departamento de mocidade	1	2020-11-02 10:38:51.251
1	Tesouraria da banda	12.1	545.60000000000002	2093.5	1560	Tesouraria dedicada para as finanças da banda Geração Sete	1	2020-11-01 12:04:10.502
\.


--
-- Name: treasury_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.treasury_id_seq', 2, true);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, surname, email, username, password, whatzapp, "isActive", "codeVerify", updated) FROM stdin;
1	Samuel	Souza	samuelgsete@gmail.com	samuelgsete	1234	85989711010	t	1234	2020-11-01 11:12:57.538
\.


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- Name: PK_55655557260341eb45eb7306810; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.treasury
    ADD CONSTRAINT "PK_55655557260341eb45eb7306810" PRIMARY KEY (id);


--
-- Name: PK_82aa5da437c5bbfb80703b08309; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY (id);


--
-- Name: PK_c98add8e192ded18b69c3e345a5; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.credit
    ADD CONSTRAINT "PK_c98add8e192ded18b69c3e345a5" PRIMARY KEY (id);


--
-- Name: PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: PK_e365a2fedf57238d970e07825ca; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY (id);


--
-- Name: PK_edd925b450e13ea36197c9590fc; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY (id);


--
-- Name: UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: FK_00d4f61d5c7353254fa9fe3254c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT "FK_00d4f61d5c7353254fa9fe3254c" FOREIGN KEY ("treasuryId") REFERENCES public.treasury(id) ON DELETE CASCADE;


--
-- Name: FK_7333416644539f63b81f4ff1b2f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT "FK_7333416644539f63b81f4ff1b2f" FOREIGN KEY ("treasuryId") REFERENCES public.treasury(id) ON DELETE CASCADE;


--
-- Name: FK_7c7fc8c20432373fc9723fa3b36; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit
    ADD CONSTRAINT "FK_7c7fc8c20432373fc9723fa3b36" FOREIGN KEY ("recipeId") REFERENCES public.recipe(id) ON DELETE CASCADE;


--
-- Name: FK_ef57b39bc3695e7e7308da22325; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT "FK_ef57b39bc3695e7e7308da22325" FOREIGN KEY ("treasuryId") REFERENCES public.treasury(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

