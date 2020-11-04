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
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" (id, name, surname, email, username, password, whatzapp, "isActive", "codeVerify", updated) VALUES (2, 'Joabe', 'Sousa', 'samuelgsete@hotmail.com', 'joabe', '1234', '85987544500', true, '68538', '2020-11-03 15:50:06.646');
INSERT INTO public."user" (id, name, surname, email, username, password, whatzapp, "isActive", "codeVerify", updated) VALUES (3, 'Layla', 'Duarte', 'layladuarte@gmail.com', 'layla', 'davi', '988922477', true, '44539', '2020-11-04 12:38:13.183');
INSERT INTO public."user" (id, name, surname, email, username, password, whatzapp, "isActive", "codeVerify", updated) VALUES (1, 'Samuel', 'Souza', 'samuelgsete@gmail.com', 'samuelgsete', '1234', '85989711010', true, '12345', '2020-11-01 11:12:57.538');

--
-- Data for Name: treasury; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.treasury (id, name, "initialAmount", "currentBalance", "incomeRecipes", "incomeExpenses", details, "userId", updated) VALUES (2, 'Tesouraria dos Jovens', 154.65000000000001, 969.54999999999995, 1197.1500000000001, 382.25, 'Essa tesouraria é dedicada às finanças do departamento de mocidade', 1, '2020-11-02 10:38:51.251');
INSERT INTO public.treasury (id, name, "initialAmount", "currentBalance", "incomeRecipes", "incomeExpenses", details, "userId", updated) VALUES (1, 'Tesouraria da banda', 12.1, 545.60000000000002, 2093.5, 1560, 'Tesouraria dedicada para as finanças da banda Geração Sete', 1, '2020-11-01 12:04:10.502');


--
-- Data for Name: expense; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (1, 'Pagamento da mensalidade da bateria eletrônica', 230, '2020-01-22 00:00:00', 'Esse retirada foi destinada ao pagamento da mensalidade da bateria eletrônica', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (2, 'Pagamento da mensalidade da bateria eletrônica', 237, '2020-02-10 00:00:00', 'Esse retirada foi destinada ao segundo pagamento referente a mensalidade da bateria eletrônica', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (3, 'Pagamento da mensalidade da bateria eletrônica', 213, '2020-03-10 00:00:00', 'Esse retirada foi destinada ao terceiro pagamento referente a mensalidade da bateria eletrônica', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (4, 'Pagamento da mensalidade dos pratos da bateria eletrônica', 235, '2020-04-14 00:00:00', 'Essa retirada foi dedicada ao pagamento da primeira mensalidade referente aos pratos da bateria eletrônica', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (5, 'Pagamento da mensalidade dos pratos da bateria', 75, '2020-06-18 00:00:00', 'Essa retirada foi destinada ao pagamento da segunda mensalidade da bateria eletrônica', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (6, 'Pagamento da mensalidade dos pratos da bateria', 75, '2020-07-10 00:00:00', 'Essa retirada foi destinada ao terceiro pagamento referente a compra dos pratos da bateria eletrônica', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (7, 'Conserto de microfones', 50, '2020-07-26 00:00:00', 'Essa retirada foi destinada ao pagamento do conserto dos microfones', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (8, 'Pagamento de emprestimo', 50, '2020-08-10 00:00:00', 'Essa retirada se refere aos dois empréstimos feitos pelo Joabe', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (9, 'Pagamento da primeira parcela do contra-baixo', 50, '2020-08-11 00:00:00', 'Essa retirada se refere ao pagamento da primeira parcela referente ao pagamento do contra-baixo', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (10, 'Pagamento da quarta mensalidade dos pratos da bateria', 75, '2020-08-11 00:00:00', 'Essa retirada foi destinada ao pagamento da quarta parcela referente a compra dos pratos da bateria', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (11, 'Pagamento da mensalidade dos pratos da bateria', 75, '2020-09-04 00:00:00', 'Essa retirada foi destinada ao pagamento da quinta parcela referente a compra dos pratos da bateria eletrônica', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (12, 'Compra de um cabo', 45, '2020-09-04 00:00:00', 'Essa retirada foi destinada a compra de um cabo do tipo p10 para o contra-baixo', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (13, 'Conserto de microfones', 50, '2020-09-06 00:00:00', 'Essa retirada foi destinada ao conserto dos microfones', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (14, 'Pagamento de empréstimo', 50, '2020-10-19 00:00:00', 'Essa retirada foi destinada ao pagamento do empréstimo feito pelo pastor Gerôncio', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (15, 'Pagamento da parcela do contra-baixo', 50, '2020-10-19 00:00:00', 'Essa retirada foi destinada ao pagamento da segunda mensalidade referente a compra do contra-baixo', 'DESPESA', 1);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (16, 'Empréstimo para a banda músical', 70, '2020-01-19 00:00:00', 'Essa retirada se refere a um empréstimo feito para a banda musical', 'DESPESA', 2);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (18, 'Impressão de hinos', 5, '2020-02-15 00:00:00', 'Essa despesa se refere a impressão de hinos para a mocidade', 'DESPESA', 2);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (17, 'Impressão de hinos', 25, '2020-01-25 00:00:00', 'Essa despesa se refere a impressão de hinos para a mocidade', 'DESPESA', 2);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (19, 'Empréstimo para a banda musical', 22, '2020-03-11 00:00:00', 'Essa retirada se refere a um empréstimo feito para a banda musical', 'DESPESA', 2);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (20, 'Empréstimo para a banda musical', 20.25, '2020-04-14 00:00:00', 'Esse despesa se refere a um empréstimo feito para a banda musical', 'DESPESA', 2);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (21, 'Ajuda na compra do contra-baixo', 200, '2020-04-17 00:00:00', 'Essa retirada foi dedicada para complementar a compra do contrabaixo da Igreja', 'DESPESA', 2);
INSERT INTO public.expense (id, description, value, "registeredIn", details, type, "treasuryId") VALUES (22, 'Ajuda no combustível', 40, '2020-09-05 00:00:00', 'Essa retirada se refere a uma ajuda para complementar o abastecimento dos transportes na viagem da mocidade', 'DESPESA', 2);


--
-- Name: expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expense_id_seq', 22, true);


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.inventory (id, "actualBalance", "currentBalance", discrepancy, "registeredIn", "treasuryId") VALUES (1, 545.60000000000002, 545.60000000000002, 0, '2020-11-01 00:00:00', 1);
INSERT INTO public.inventory (id, "actualBalance", "currentBalance", discrepancy, "registeredIn", "treasuryId") VALUES (2, 728.04999999999995, 728, 0.049999999999954525, '2020-10-27 00:00:00', 2);
INSERT INTO public.inventory (id, "actualBalance", "currentBalance", discrepancy, "registeredIn", "treasuryId") VALUES (3, 969.54999999999995, 969, 0.54999999999995453, '2020-11-01 00:00:00', 2);


--
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventory_id_seq', 3, true);


--
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (2, 'Venda da banda', 124.3, NULL, 'RECEITA', '2020-01-19 00:00:00', NULL, 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (1, 'Venda da banda', 163.84999999999999, NULL, 'RECEITA', '2020-01-12 00:00:00', NULL, 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (3, 'Oferta recebida do departamento de mocidade', 70, NULL, 'RECEITA', '2020-01-22 00:00:00', 'Essa oferta foi recebida para complementar a quantia referente a mensalidade da compra da bateria eletrônica', 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (4, 'Venda da banda', 181, NULL, 'RECEITA', '2020-02-09 00:00:00', NULL, 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (5, 'Venda da banda', 124, NULL, 'RECEITA', '2020-02-15 00:00:00', 'Nessa venda foi vendido somente lanches', 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (6, 'Oferta recebida do departamento de mocidade', 22, NULL, 'RECEITA', '2020-03-11 00:00:00', 'Oferta recebida para complementar o último pagamento referente a mensalidade da bateria eletrônica', 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (7, 'Venda da banda', 209.59999999999999, NULL, 'RECEITA', '2020-03-15 00:00:00', 'Nessa venda foi vendido somente lanches', 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (8, 'Oferta recebida do departamento de mocidade', 20.25, NULL, 'RECEITA', '2020-04-14 00:00:00', 'Oferta recebida para complementar o pagamento da primeira mensalidade dos pratos da bateria eletrônica', 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (9, 'Oferta vonlutária', 25, 'José Joabe de Sousa Amorim', 'RECEITA', '2020-06-18 00:00:00', 'Oferta recebida para efetuar o pagamento da mensalidade dos pratos da bateria eletrônica', 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (10, 'Oferta voluntária', 50, 'Pastor Gerôncio Sousa Sales', 'RECEITA', '2020-06-18 00:00:00', 'Oferta recebida para o segundo pagamento referente aos pratos da bateria eletrônica', 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (11, 'Oferta voluntária', 25, 'José Joabe de Sousa Amorim', 'RECEITA', '2020-07-10 00:00:00', 'Essa oferta foi recebida para o pagamento da terceira mensalidade dos pratos da bateria eletrônica', 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (12, 'Oferta Voluntária', 50, 'Pastor Gerôncio Sousa Sales', 'RECEITA', '2020-07-10 00:00:00', 'Essa oferta foi recebida para o pagamento da terceira mensalidade referente aos pratos da bateria eletrônica', 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (13, 'Venda da banda', 178, NULL, 'RECEITA', '2020-07-19 00:00:00', NULL, 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (14, 'Venda da banda', 202.5, NULL, 'RECEITA', '2020-07-26 00:00:00', NULL, 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (15, 'Venda da banda', 170, NULL, 'RECEITA', '2020-08-16 00:00:00', NULL, 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (16, 'Venda da banda', 261, NULL, 'RECEITA', '2020-09-27 00:00:00', NULL, 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (17, 'Venda da banda', 217, NULL, 'RECEITA', '2020-10-25 00:00:00', NULL, 1);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (18, 'Oferta do culto', 22.699999999999999, NULL, 'RECEITA', '2020-01-11 00:00:00', 'Oferta do primeiro culto de mocidade de 2020', 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (19, 'Venda da mocidade', 179.5, NULL, 'RECEITA', '2020-01-19 00:00:00', NULL, 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (20, 'Recebimento de débitos', 10, NULL, 'RECEITA', '2020-01-26 00:00:00', 'Essa receita refere-se ao recebimento de dois débitos da primeira venda realizada pela mocidade', 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (21, 'Oferta do culto ', 12.050000000000001, NULL, 'RECEITA', '2020-02-08 00:00:00', 'Esse receita refere-se as ofertas recebidas do segundo culto de jovens de 2020', 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (22, 'Venda da mocidade', 114, NULL, 'RECEITA', '2020-02-16 00:00:00', NULL, 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (23, 'Venda da banda', 31.25, NULL, 'RECEITA', '2020-03-14 00:00:00', NULL, 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (24, 'Oferta do culto', 22.050000000000001, NULL, 'RECEITA', '2020-07-11 00:00:00', 'Essa receita se refere as ofertas tiradas no primeiro culto de mocidade após o lockdown causado pela crise do corona vírus ', 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (25, 'Oferta do culto', 23.449999999999999, NULL, 'RECEITA', '2020-08-08 00:00:00', 'Essa retirada se refere as ofertas do culto de mocidade', 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (26, 'Venda dos jovens', 167, NULL, 'RECEITA', '2020-08-30 00:00:00', NULL, 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (27, 'Oferta do culto', 98.799999999999997, NULL, 'RECEITA', '2020-09-12 00:00:00', 'Essa despesa se refere as ofertas do culto de jovens', 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (28, 'Venda dos jovens', 243.75, NULL, 'RECEITA', '2020-09-20 00:00:00', NULL, 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (29, 'Oferta do culto', 31.100000000000001, NULL, 'RECEITA', '2020-10-10 00:00:00', 'Essa despesa se refere as ofertas do culto de mocidade', 2);
INSERT INTO public.recipe (id, description, value, offerer, type, "registeredIn", details, "treasuryId") VALUES (30, 'Venda dos jovens', 241.5, NULL, 'RECEITA', '2020-11-01 00:00:00', NULL, 2);


--
-- Name: recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipe_id_seq', 30, true);


--
-- Name: treasury_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.treasury_id_seq', 2, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 3, true);


--
-- PostgreSQL database dump complete
--

