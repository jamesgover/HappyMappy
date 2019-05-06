\connect happy

CREATE TABLE mappy.EthereumNode (
    ip cidr PRIMARY KEY,
    density integer,
    lat float8,
    long float8,
    last_observed timestamp
);
COMMENT ON TABLE mappy.EthereumNode IS
'Stores each Node found in the network';
