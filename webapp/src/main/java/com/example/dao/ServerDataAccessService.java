package com.example.dao;

import com.example.model.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("postgres-server")
public class ServerDataAccessService implements ServerDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ServerDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertServer(Server server) {
        String sql = "INSERT INTO server VALUES (?, ?, ?)";
        Object[] params = new Object[] { server.getId(), server.getName(), server.getLocation() };
        try {
            jdbcTemplate.update(sql, params);
            return 1;
        } catch (DataAccessException exc) {
            System.out.println(exc.toString());
            return 0;
        }
    }

    @Override
    public List<Server> selectAllServers() {
        String sql = "SELECT server_id, server_name, server_location FROM server";
        List<Server> servers = jdbcTemplate.query(sql, ((resultSet, i) -> {
            return new Server(resultSet.getInt("server_id"), resultSet.getString("server_name"),
                    resultSet.getString("server_location"));
        }));
        return servers;
    }

    @Override
    public Optional<Server> selectServerById(int id) {
        final String sql = "SELECT * FROM server WHERE server_id = ?";
        Server server = jdbcTemplate.queryForObject(sql, new Object[] { id }, ((resultSet, i) -> {
            return new Server(resultSet.getInt("server_id"), resultSet.getString("server_name"),
                    resultSet.getString("server_location"));
        }));
        return Optional.ofNullable(server);
    }

    @Override
    public int deleteServers() {
        final String sql = "DELETE FROM server";
        try {
            jdbcTemplate.execute(sql);
            return 1;
        } catch (DataAccessException exc) {
            return 0;
        }
    }
}
