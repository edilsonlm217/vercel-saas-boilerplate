create table "public"."categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "type" text not null,
    "user_id" uuid,
    "created_at" timestamp without time zone default now()
);


alter table "public"."categories" enable row level security;

create table "public"."fixedtransactions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "amount" numeric not null,
    "type" text not null,
    "category_id" uuid,
    "description" text,
    "due_date" timestamp without time zone not null
);


create table "public"."recurringtransactions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "amount" numeric not null,
    "type" text not null,
    "category_id" uuid,
    "description" text,
    "frequency" text not null,
    "occurrences" integer,
    "due_date" timestamp without time zone not null
);


create table "public"."transactions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "amount" numeric not null,
    "type" text not null,
    "category_id" uuid,
    "description" text,
    "due_date" timestamp without time zone not null
);


CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX fixedtransactions_pkey ON public.fixedtransactions USING btree (id);

CREATE UNIQUE INDEX recurringtransactions_pkey ON public.recurringtransactions USING btree (id);

CREATE UNIQUE INDEX transactions_pkey ON public.transactions USING btree (id);

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."fixedtransactions" add constraint "fixedtransactions_pkey" PRIMARY KEY using index "fixedtransactions_pkey";

alter table "public"."recurringtransactions" add constraint "recurringtransactions_pkey" PRIMARY KEY using index "recurringtransactions_pkey";

alter table "public"."transactions" add constraint "transactions_pkey" PRIMARY KEY using index "transactions_pkey";

alter table "public"."categories" add constraint "categories_type_check" CHECK ((type = ANY (ARRAY['income'::text, 'expense'::text]))) not valid;

alter table "public"."categories" validate constraint "categories_type_check";

alter table "public"."categories" add constraint "categories_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."categories" validate constraint "categories_user_id_fkey";

alter table "public"."fixedtransactions" add constraint "fixedtransactions_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) not valid;

alter table "public"."fixedtransactions" validate constraint "fixedtransactions_category_id_fkey";

alter table "public"."fixedtransactions" add constraint "fixedtransactions_type_check" CHECK ((type = ANY (ARRAY['income'::text, 'expense'::text]))) not valid;

alter table "public"."fixedtransactions" validate constraint "fixedtransactions_type_check";

alter table "public"."fixedtransactions" add constraint "fixedtransactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."fixedtransactions" validate constraint "fixedtransactions_user_id_fkey";

alter table "public"."recurringtransactions" add constraint "recurringtransactions_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) not valid;

alter table "public"."recurringtransactions" validate constraint "recurringtransactions_category_id_fkey";

alter table "public"."recurringtransactions" add constraint "recurringtransactions_frequency_check" CHECK ((frequency = ANY (ARRAY['weekly'::text, 'monthly'::text, 'yearly'::text]))) not valid;

alter table "public"."recurringtransactions" validate constraint "recurringtransactions_frequency_check";

alter table "public"."recurringtransactions" add constraint "recurringtransactions_occurrences_check" CHECK ((occurrences > 0)) not valid;

alter table "public"."recurringtransactions" validate constraint "recurringtransactions_occurrences_check";

alter table "public"."recurringtransactions" add constraint "recurringtransactions_type_check" CHECK ((type = ANY (ARRAY['income'::text, 'expense'::text]))) not valid;

alter table "public"."recurringtransactions" validate constraint "recurringtransactions_type_check";

alter table "public"."recurringtransactions" add constraint "recurringtransactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."recurringtransactions" validate constraint "recurringtransactions_user_id_fkey";

alter table "public"."transactions" add constraint "transactions_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) not valid;

alter table "public"."transactions" validate constraint "transactions_category_id_fkey";

alter table "public"."transactions" add constraint "transactions_type_check" CHECK ((type = ANY (ARRAY['income'::text, 'expense'::text]))) not valid;

alter table "public"."transactions" validate constraint "transactions_type_check";

alter table "public"."transactions" add constraint "transactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."transactions" validate constraint "transactions_user_id_fkey";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."fixedtransactions" to "anon";

grant insert on table "public"."fixedtransactions" to "anon";

grant references on table "public"."fixedtransactions" to "anon";

grant select on table "public"."fixedtransactions" to "anon";

grant trigger on table "public"."fixedtransactions" to "anon";

grant truncate on table "public"."fixedtransactions" to "anon";

grant update on table "public"."fixedtransactions" to "anon";

grant delete on table "public"."fixedtransactions" to "authenticated";

grant insert on table "public"."fixedtransactions" to "authenticated";

grant references on table "public"."fixedtransactions" to "authenticated";

grant select on table "public"."fixedtransactions" to "authenticated";

grant trigger on table "public"."fixedtransactions" to "authenticated";

grant truncate on table "public"."fixedtransactions" to "authenticated";

grant update on table "public"."fixedtransactions" to "authenticated";

grant delete on table "public"."fixedtransactions" to "service_role";

grant insert on table "public"."fixedtransactions" to "service_role";

grant references on table "public"."fixedtransactions" to "service_role";

grant select on table "public"."fixedtransactions" to "service_role";

grant trigger on table "public"."fixedtransactions" to "service_role";

grant truncate on table "public"."fixedtransactions" to "service_role";

grant update on table "public"."fixedtransactions" to "service_role";

grant delete on table "public"."recurringtransactions" to "anon";

grant insert on table "public"."recurringtransactions" to "anon";

grant references on table "public"."recurringtransactions" to "anon";

grant select on table "public"."recurringtransactions" to "anon";

grant trigger on table "public"."recurringtransactions" to "anon";

grant truncate on table "public"."recurringtransactions" to "anon";

grant update on table "public"."recurringtransactions" to "anon";

grant delete on table "public"."recurringtransactions" to "authenticated";

grant insert on table "public"."recurringtransactions" to "authenticated";

grant references on table "public"."recurringtransactions" to "authenticated";

grant select on table "public"."recurringtransactions" to "authenticated";

grant trigger on table "public"."recurringtransactions" to "authenticated";

grant truncate on table "public"."recurringtransactions" to "authenticated";

grant update on table "public"."recurringtransactions" to "authenticated";

grant delete on table "public"."recurringtransactions" to "service_role";

grant insert on table "public"."recurringtransactions" to "service_role";

grant references on table "public"."recurringtransactions" to "service_role";

grant select on table "public"."recurringtransactions" to "service_role";

grant trigger on table "public"."recurringtransactions" to "service_role";

grant truncate on table "public"."recurringtransactions" to "service_role";

grant update on table "public"."recurringtransactions" to "service_role";

grant delete on table "public"."transactions" to "anon";

grant insert on table "public"."transactions" to "anon";

grant references on table "public"."transactions" to "anon";

grant select on table "public"."transactions" to "anon";

grant trigger on table "public"."transactions" to "anon";

grant truncate on table "public"."transactions" to "anon";

grant update on table "public"."transactions" to "anon";

grant delete on table "public"."transactions" to "authenticated";

grant insert on table "public"."transactions" to "authenticated";

grant references on table "public"."transactions" to "authenticated";

grant select on table "public"."transactions" to "authenticated";

grant trigger on table "public"."transactions" to "authenticated";

grant truncate on table "public"."transactions" to "authenticated";

grant update on table "public"."transactions" to "authenticated";

grant delete on table "public"."transactions" to "service_role";

grant insert on table "public"."transactions" to "service_role";

grant references on table "public"."transactions" to "service_role";

grant select on table "public"."transactions" to "service_role";

grant trigger on table "public"."transactions" to "service_role";

grant truncate on table "public"."transactions" to "service_role";

grant update on table "public"."transactions" to "service_role";

create policy "Allow access to public categories"
on "public"."categories"
as permissive
for select
to public
using ((user_id IS NULL));


create policy "Allow users to access their own categories"
on "public"."categories"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Allow users to insert their own categories"
on "public"."categories"
as permissive
for insert
to public
with check (((auth.uid() = user_id) OR (user_id IS NULL)));


create policy "delete_fixedtransactions"
on "public"."fixedtransactions"
as permissive
for delete
to public
using ((user_id = auth.uid()));


create policy "insert_fixedtransactions"
on "public"."fixedtransactions"
as permissive
for insert
to public
with check ((user_id = auth.uid()));


create policy "select_fixedtransactions"
on "public"."fixedtransactions"
as permissive
for select
to public
using (true);


create policy "update_fixedtransactions"
on "public"."fixedtransactions"
as permissive
for update
to public
with check ((user_id = auth.uid()));


create policy "delete_recurringtransactions"
on "public"."recurringtransactions"
as permissive
for delete
to public
using ((user_id = auth.uid()));


create policy "insert_recurringtransactions"
on "public"."recurringtransactions"
as permissive
for insert
to public
with check ((user_id = auth.uid()));


create policy "select_recurringtransactions"
on "public"."recurringtransactions"
as permissive
for select
to public
using (true);


create policy "update_recurringtransactions"
on "public"."recurringtransactions"
as permissive
for update
to public
with check ((user_id = auth.uid()));


create policy "delete_transactions"
on "public"."transactions"
as permissive
for delete
to public
using ((user_id = auth.uid()));


create policy "insert_transactions"
on "public"."transactions"
as permissive
for insert
to public
with check ((user_id = auth.uid()));


create policy "select_transactions"
on "public"."transactions"
as permissive
for select
to public
using (true);


create policy "update_transactions"
on "public"."transactions"
as permissive
for update
to public
with check ((user_id = auth.uid()));




