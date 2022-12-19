CREATE TABLE public."user"
(
  cod_user varchar NOT NULL,
  "password" varchar NULL,
  name varchar NULL,
  lastname varchar NULL,
  email varchar NULL,
  status boolean NOT NULL DEFAULT true,
  phone varchar NULL,
  image varchar NULL,
  CONSTRAINT user_pk PRIMARY KEY (cod_user)
);

CREATE TABLE public.product
(
  cod_product varchar NULL,
  "name" varchar NULL,
  description text NULL,
  status boolean NOT NULL DEFAULT true,
  CONSTRAINT product_pk PRIMARY KEY (cod_product)
);

CREATE TABLE public.tag
(
  cod_tag varchar NULL,
  "name" varchar NULL,
  description text NULL,
  status boolean NOT NULL DEFAULT true,
  CONSTRAINT tag_pk PRIMARY KEY (cod_tag)
);

CREATE TABLE public.price
(
  cod_price varchar NULL,
  "name" varchar NULL,
  description text NULL,
  CONSTRAINT price_pk PRIMARY KEY (cod_price)
);

CREATE TABLE public.product_tags
(
  id SERIAL NOT NULL,
  cod_product varchar NULL,
  cod_tag varchar NULL,
  CONSTRAINT product_tags_fk FOREIGN KEY (cod_product) REFERENCES public.product(cod_product),
  CONSTRAINT product_tags_fk_1 FOREIGN KEY (cod_tag) REFERENCES public.tag(cod_tag)
);

CREATE TABLE public.product_images
(
  id SERIAL NOT NULL,
  cod_product varchar NULL,
  link text NULL,
  CONSTRAINT product_images_fk FOREIGN KEY (cod_product) REFERENCES public.product(cod_product)
);

CREATE TABLE public.price_list
(
  id SERIAL NOT NULL,
  cod_price varchar NULL,
  cod_product varchar NULL,
  value money NULL,
  percent_max_cash_discount int NULL,
  status boolean NOT NULL DEFAULT true,
  CONSTRAINT price_list_fk FOREIGN KEY (cod_product) REFERENCES public.product(cod_product),
  CONSTRAINT price_list_fk_1 FOREIGN KEY (cod_price) REFERENCES public.price(cod_price)
);

CREATE TABLE public.inventory
(
  cod_product varchar NULL,
  units bigint NULL,
  unit_cost money NULL,
  CONSTRAINT inventory_fk FOREIGN KEY (cod_product) REFERENCES public.product(cod_product)
);

CREATE TABLE public.customer
(
  cod_customer varchar NULL,
  "name" varchar NULL,
  lastname varchar NULL,
  invoice_name varchar NULL,
  address varchar NULL,
  nit varchar NULL,
  phone varchar NULL,
  email varchar NULL,
  "comment" text NULL,
  status boolean NOT NULL DEFAULT true,
  CONSTRAINT customer_pk PRIMARY KEY (cod_customer)
);

CREATE TABLE public.supplier
(
  cod_supplier varchar NULL,
  "name" varchar NULL,
  address varchar NULL,
  nit varchar NULL,
  phone varchar NULL,
  email varchar NULL,
  "comment" text NULL,
  status boolean NOT NULL DEFAULT true,
  CONSTRAINT supplier_pk PRIMARY KEY (cod_supplier)
);

CREATE TABLE public.sale
(
  cod_sale bigint NULL,
  cod_customer varchar NULL,
  cod_user varchar NULL,
  "date" timestamp NULL,
  sub_total money NULL,
  total_cash_discount money NULL,
  total money NULL,
  CONSTRAINT sale_pk PRIMARY KEY (cod_sale),
  CONSTRAINT sale_fk FOREIGN KEY (cod_customer) REFERENCES public.customer(cod_customer),
  CONSTRAINT sale_fk_1 FOREIGN KEY (cod_user) REFERENCES public."user"(cod_user)
);

CREATE TABLE public.sale_detail
(
  id SERIAL NOT NULL,
  cod_sale int8 NULL,
  cod_product varchar NULL,
  cod_price varchar NULL,
  units decimal NULL,
  unit_price money NULL,
  sub_total money NULL,
  total_cash_discount money NULL,
  CONSTRAINT sale_detail_product_fk FOREIGN KEY (cod_product) REFERENCES public.product(cod_product),
  CONSTRAINT sale_detail_price_fk FOREIGN KEY (cod_price) REFERENCES public.price(cod_price),
  CONSTRAINT sale_detail_sale_fk FOREIGN KEY (cod_price) REFERENCES public.price(cod_price)
);

CREATE TABLE public.purchase
(
  cod_purchase bigint NULL,
  cod_supplier varchar NULL,
  cod_user varchar NULL,
  "date" timestamp NULL,
  sub_total money NULL,
  total_cash_discount money NULL,
  total money NULL,
  CONSTRAINT purchase_pk PRIMARY KEY (cod_purchase),
  CONSTRAINT purchase_fk FOREIGN KEY (cod_supplier) REFERENCES public.supplier(cod_supplier),
  CONSTRAINT purchase_fk_1 FOREIGN KEY (cod_user) REFERENCES public."user"(cod_user)
);

CREATE TABLE public.purchase_detail
(
  id SERIAL NOT NULL,
  cod_purchase bigint NULL,
  cod_product varchar NULL,
  units numeric NULL,
  unit_price money NULL,
  sub_total money NULL,
  total_cash_discount money NULL,
  total money NULL,
  CONSTRAINT purchase_detail_fk FOREIGN KEY (cod_product) REFERENCES public.product(cod_product),
  CONSTRAINT purchase_detail_fk_1 FOREIGN KEY (cod_purchase) REFERENCES public.purchase(cod_purchase)
);

CREATE TABLE public.action_logs
(
  cod_action_log bigint NULL,
  cod_user varchar NULL,
  "action" varchar NULL,
  description text NULL,
  "date" timestamp NULL,
  CONSTRAINT action_logs_pk PRIMARY KEY (cod_action_log),
  CONSTRAINT action_logs_fk FOREIGN KEY (cod_user) REFERENCES public."user"(cod_user)
);
