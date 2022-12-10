delete from sensor where moduleid_module in (select moduleid from module where deviceid_device = 70000008);
delete from module where deviceid_device = 70000008
delete from device where deviceid = 70000008;
delete from station where stationid = 1;
delete from site where siteid = 1;
delete from public.user where userid = 90000009;
