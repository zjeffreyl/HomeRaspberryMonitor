package com.example.dao;

import com.example.model.Server;
import java.util.List;
import java.util.Optional;
import java.util.UUID;;

public interface ServerDao {
    int insertServer(Server server);

    List<Server> selectAllServers();

    Optional<Server> selectServerById(int id);

    int deleteServers();
}
