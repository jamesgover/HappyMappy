\connect happy

CREATE TABLE mappy.EthereumConnection (
    neighbour cidr NOT NULL REFERENCES mappy.EthereumNode(ip),
    node cidr NOT NULL REFERENCES mappy.EthereumNode(ip),
    reported timestamp,
    distance integer,
    PRIMARY KEY(neighbour, node)
);
COMMENT ON TABLE mappy.EthereumConnection IS
'Stores connections in the network';
