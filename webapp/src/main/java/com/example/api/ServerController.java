package com.example.api;

import com.example.model.Server;
import com.example.service.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@RestController
@RequestMapping("/api/server")
public class ServerController {
    private ServerService serverService;

    @Autowired
    public ServerController(ServerService serverService)
    {
        this.serverService = serverService;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public Collection<Server> servers() { return serverService.getAllServers(); }

    @PostMapping
    public int addServer(@RequestBody @Valid @NotNull Server server)
    {
        return serverService.insertServer(server);
    }

    @GetMapping(path = "{id}")
    public Server getServerById(@PathVariable("id") int id)
    {
        return serverService.getServerById(id).orElse(null);
    }

    @DeleteMapping
    public int deleteServers()
    {
        return serverService.deleteServers();
    }
}
