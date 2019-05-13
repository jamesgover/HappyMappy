\connect happy

CREATE TABLE mappy.EthereumLocation (
    loc integer NOT NULL,
    lat float8,
    long float8,
    name text,
    density int,
    PRIMARY KEY (loc)
);
COMMENT ON TABLE mappy.EthereumLocation IS
'Ethereum node locations';

CREATE TABLE mappy.EthereumNode (
    id text NOT NULL,
    ip text,
    loc integer REFERENCES mappy.EthereumLocation (loc),
    PRIMARY KEY (id)
);
COMMENT ON TABLE mappy.EthereumNode IS
'Stores each Node found in the network';

CREATE TABLE mappy.EthereumConnection (
    neighbour text NOT NULL REFERENCES mappy.EthereumNode (id),
    node text NOT NULL REFERENCES mappy.EthereumNode (id),
    distance integer,
    PRIMARY KEY(neighbour, node)
);
COMMENT ON TABLE mappy.EthereumConnection IS
'Stores connections in the network';
