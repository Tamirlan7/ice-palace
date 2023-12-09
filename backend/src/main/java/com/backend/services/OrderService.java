package com.backend.services;

import com.backend.models.Order;
import com.backend.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderService {

    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
        return orderRepository.save(
                Order.builder()
                        .issuedAt(LocalDateTime.now())
                        .expiresAt(LocalDateTime.now().plus(Duration.ofMinutes(30)))
                        .userPhone(order.getUserPhone())
                        .adultIceSkateCount(order.getAdultIceSkateCount())
                        .childIceSkateCount(order.getChildIceSkateCount())
                        .childEntryCount(order.getChildEntryCount())
                        .adultEntryCount(order.getAdultEntryCount())
                        .totalPrice(order.getTotalPrice())
                        .build()
        );
    }
}
