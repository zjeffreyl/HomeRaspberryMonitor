package com.example.service;

import com.example.dao.ServerDao;
import com.example.model.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ServerService {
    private final ServerDao serverDao;

    @Autowired
    public ServerService(@Qualifier("postgres-server") ServerDao serverDao) {
        this.serverDao = serverDao;
    }

    public List<Server> getAllServers()
    {
        return serverDao.selectAllServers();
    }

    public int insertServer(Server server) {
        return serverDao.insertServer(server); }

    public Optional<Server> getServerById(int id)
    {
        return serverDao.selectServerById(id);
    }

    public int deleteServers()
    {
        return serverDao.deleteServers();
    }

    
}
