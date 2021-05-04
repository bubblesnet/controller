ALTER TABLE site add column Userid_user INT NULL;
ALTER TABLE site ADD FOREIGN KEY (Userid_user) REFERENCES public.user(userid);
ALTER TABLE station DROP COLUMN Userid_user;
