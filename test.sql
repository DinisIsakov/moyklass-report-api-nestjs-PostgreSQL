--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Homebrew)
-- Dumped by pg_dump version 14.10 (Homebrew)

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

ALTER TABLE IF EXISTS ONLY public.lesson_students DROP CONSTRAINT IF EXISTS lesson_students_student_id_fkey;
ALTER TABLE IF EXISTS ONLY public.lesson_teachers DROP CONSTRAINT IF EXISTS "FK_84f4630339eabfa2fe7e2f2fa54";
ALTER TABLE IF EXISTS ONLY public.lesson_teachers DROP CONSTRAINT IF EXISTS "FK_67d72981eaf52acf1673ca53a5f";
DROP INDEX IF EXISTS public."IDX_84f4630339eabfa2fe7e2f2fa5";
DROP INDEX IF EXISTS public."IDX_67d72981eaf52acf1673ca53a5";
ALTER TABLE IF EXISTS ONLY public.teachers DROP CONSTRAINT IF EXISTS teachers_pkey;
ALTER TABLE IF EXISTS ONLY public.students DROP CONSTRAINT IF EXISTS students_pkey;
ALTER TABLE IF EXISTS ONLY public.lessons DROP CONSTRAINT IF EXISTS lessons_pkey;
ALTER TABLE IF EXISTS ONLY public.lesson_teachers DROP CONSTRAINT IF EXISTS "PK_8ef1962a7fd5d1f297d20a3240f";
ALTER TABLE IF EXISTS ONLY public.student DROP CONSTRAINT IF EXISTS "PK_3d8016e1cb58429474a3c041904";
ALTER TABLE IF EXISTS ONLY public.teacher DROP CONSTRAINT IF EXISTS "PK_2f807294148612a9751dacf1026";
ALTER TABLE IF EXISTS ONLY public.lesson DROP CONSTRAINT IF EXISTS "PK_0ef25918f0237e68696dee455bd";
ALTER TABLE IF EXISTS public.teachers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.teacher ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.students ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.student ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.lessons ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.lesson ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.teachers_id_seq;
DROP TABLE IF EXISTS public.teachers;
DROP SEQUENCE IF EXISTS public.teacher_id_seq;
DROP TABLE IF EXISTS public.teacher;
DROP SEQUENCE IF EXISTS public.students_id_seq;
DROP TABLE IF EXISTS public.students;
DROP SEQUENCE IF EXISTS public.student_id_seq;
DROP TABLE IF EXISTS public.student;
DROP SEQUENCE IF EXISTS public.lessons_id_seq;
DROP TABLE IF EXISTS public.lessons;
DROP TABLE IF EXISTS public.lesson_teachers;
DROP TABLE IF EXISTS public.lesson_students;
DROP SEQUENCE IF EXISTS public.lesson_id_seq;
DROP TABLE IF EXISTS public.lesson;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: lesson; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lesson (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    date date NOT NULL,
    status integer NOT NULL,
    days integer[]
);


ALTER TABLE public.lesson OWNER TO postgres;

--
-- Name: lesson_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lesson_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lesson_id_seq OWNER TO postgres;

--
-- Name: lesson_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lesson_id_seq OWNED BY public.lesson.id;


--
-- Name: lesson_students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lesson_students (
    lesson_id integer,
    student_id integer,
    visit boolean DEFAULT false
);


ALTER TABLE public.lesson_students OWNER TO postgres;

--
-- Name: lesson_teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lesson_teachers (
    "lessonId" integer NOT NULL,
    "teacherId" integer NOT NULL
);


ALTER TABLE public.lesson_teachers OWNER TO postgres;

--
-- Name: lessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons (
    id integer NOT NULL,
    date date NOT NULL,
    title character varying(100),
    status integer DEFAULT 0
);


ALTER TABLE public.lessons OWNER TO postgres;

--
-- Name: lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lessons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lessons_id_seq OWNER TO postgres;

--
-- Name: lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lessons_id_seq OWNED BY public.lessons.id;


--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.student OWNER TO postgres;

--
-- Name: student_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.student_id_seq OWNER TO postgres;

--
-- Name: student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.student_id_seq OWNED BY public.student.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    name character varying(10)
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: teacher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.teacher OWNER TO postgres;

--
-- Name: teacher_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teacher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teacher_id_seq OWNER TO postgres;

--
-- Name: teacher_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teacher_id_seq OWNED BY public.teacher.id;


--
-- Name: teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    name character varying(10)
);


ALTER TABLE public.teachers OWNER TO postgres;

--
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teachers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teachers_id_seq OWNER TO postgres;

--
-- Name: teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;


--
-- Name: lesson id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson ALTER COLUMN id SET DEFAULT nextval('public.lesson_id_seq'::regclass);


--
-- Name: lessons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons ALTER COLUMN id SET DEFAULT nextval('public.lessons_id_seq'::regclass);


--
-- Name: student id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student ALTER COLUMN id SET DEFAULT nextval('public.student_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Name: teacher id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher ALTER COLUMN id SET DEFAULT nextval('public.teacher_id_seq'::regclass);


--
-- Name: teachers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);


--
-- Data for Name: lesson; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lesson (id, title, date, status, days) FROM stdin;
\.


--
-- Data for Name: lesson_students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lesson_students (lesson_id, student_id, visit) FROM stdin;
1	1	t
1	2	t
1	3	f
2	2	t
2	3	t
4	1	t
4	2	t
4	3	t
4	4	t
5	4	f
5	2	f
6	1	f
6	3	f
7	2	t
7	1	t
8	1	f
8	4	t
8	2	t
9	2	f
10	1	f
10	3	t
1	1	t
1	2	t
1	3	f
2	2	t
2	3	t
4	1	t
4	2	t
4	3	t
4	4	t
5	4	f
5	2	f
6	1	f
6	3	f
7	2	t
7	1	t
8	1	f
8	4	t
8	2	t
9	2	f
10	1	f
10	3	t
\.


--
-- Data for Name: lesson_teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lesson_teachers ("lessonId", "teacherId") FROM stdin;
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons (id, date, title, status) FROM stdin;
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student (id, name) FROM stdin;
1	John
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, name) FROM stdin;
1	Ivan
2	Sergey
3	Maxim
4	Slava
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacher (id, name) FROM stdin;
1	Alice
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teachers (id, name) FROM stdin;
1	Sveta
2	Marina
3	Angelina
4	Masha
\.


--
-- Name: lesson_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lesson_id_seq', 1, true);


--
-- Name: lessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lessons_id_seq', 1, false);


--
-- Name: student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_id_seq', 1, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 4, true);


--
-- Name: teacher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teacher_id_seq', 1, true);


--
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teachers_id_seq', 4, true);


--
-- Name: lesson PK_0ef25918f0237e68696dee455bd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson
    ADD CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY (id);


--
-- Name: teacher PK_2f807294148612a9751dacf1026; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY (id);


--
-- Name: student PK_3d8016e1cb58429474a3c041904; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY (id);


--
-- Name: lesson_teachers PK_8ef1962a7fd5d1f297d20a3240f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson_teachers
    ADD CONSTRAINT "PK_8ef1962a7fd5d1f297d20a3240f" PRIMARY KEY ("lessonId", "teacherId");


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- Name: IDX_67d72981eaf52acf1673ca53a5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_67d72981eaf52acf1673ca53a5" ON public.lesson_teachers USING btree ("lessonId");


--
-- Name: IDX_84f4630339eabfa2fe7e2f2fa5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_84f4630339eabfa2fe7e2f2fa5" ON public.lesson_teachers USING btree ("teacherId");


--
-- Name: lesson_teachers FK_67d72981eaf52acf1673ca53a5f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson_teachers
    ADD CONSTRAINT "FK_67d72981eaf52acf1673ca53a5f" FOREIGN KEY ("lessonId") REFERENCES public.lesson(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lesson_teachers FK_84f4630339eabfa2fe7e2f2fa54; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson_teachers
    ADD CONSTRAINT "FK_84f4630339eabfa2fe7e2f2fa54" FOREIGN KEY ("teacherId") REFERENCES public.teacher(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lesson_students lesson_students_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson_students
    ADD CONSTRAINT lesson_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: dinis
--

GRANT ALL ON SCHEMA public TO postgres;


--
-- PostgreSQL database dump complete
--

