\connect happy

INSERT INTO mappy.EthereumLocation (loc, lat, long, name, density) VALUES
(0, -27.4930309, 152.981343, 'A place', 1),
(1, -27.504987, 152.978442, 'A place 2', 1),
(2, -27.495613, 152.978395, 'Another place', 1),
(3, -27.500194, 153.015046, 'One more place', 2);

INSERT INTO mappy.EthereumNode (id, ip, loc) VALUES
('id1', '120.30.12.23', 0),
('id2', '32.3.12.45', 1),
('id3', '45.30.2.23', 2),
('id4', '120.34.5.23', 3),
('id5', '12.30.12.23', 3);

INSERT INTO mappy.EthereumConnection (neighbour, node, distance) VALUES
('id1', 'id2', 5),
('id2', 'id3', 10),
('id3', 'id1', 4),
('id4', 'id3', 20);
