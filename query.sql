CREATE DATABASE si_perjaka;

CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    nama VARCHAR NOT NULL,
    nip BIGINT default('0'),
    pangkat VARCHAR default('-'),
    jabatan VARCHAR default('-'),
    instansi VARCHAR default('-'),
    npwp VARCHAR default('-'),
    rekening BIGINT default('0'),
    bank VARCHAR default('-'),
    wi VARCHAR,
    photo VARCHAR default('user.png'),
    role VARCHAR NOT NULL default('pengajar'),
    total_jam INT default('0')
);

CREATE TABLE pelatihan(
    id varchar PRIMARY KEY,
    id_user varchar references users on update cascade on delete cascade,
    nama_pelatihan VARCHAR NOT NULL,
    materi VARCHAR NOT NULL,
    durasi INT NOT NULL,
    tanggal VARCHAR NOT NULL,
    created_at VARCHAR,
    updated_at VARCHAR
);
select pelatihan.*, users.nama from pelatihan left join users on pelatihan.id_user=users.id where pelatihan.id_user='e3faa8a9-8c86-4539-820f-f27a90b22580';
return Pool.query(`select pelatihan.*, users.nama from pelatihan left join users on pelatihan.id_user=users.id where nama_pelatihan LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
return Pool.query(`select pelatihan.*, users.nama from pelatihan left join users on pelatihan.id_user=users.id where pelatihan.id_user='${id_user}'`);

CREATE TABLE menu(
    id VARCHAR PRIMARY KEY,
    nama VARCHAR NOT NULL,
    photo VARCHAR
);

CREATE TABLE admin(
    id VARCHAR PRIMARY key,
    email varchar NOT NULL,
    password VARCHAR NOT NULL,
    nama VARCHAR NOT NULL,
    role VARCHAR NOT NULL default('admin')
);