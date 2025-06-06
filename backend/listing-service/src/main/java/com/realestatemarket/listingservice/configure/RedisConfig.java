package com.realestatemarket.listingservice.configure;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.realestatemarket.listingservice.entity.Address;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Address> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Address> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new Jackson2JsonRedisSerializer<>(Address.class));
        return template;
    }
}