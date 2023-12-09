package com.backend.controllers;

import com.backend.models.Order;
import com.backend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/order")
public class OrderController {

    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order requestOrder) {
        Order order = orderService.createOrder(requestOrder);

        return ResponseEntity
                .created(URI.create("/api/v1/order/" + order.getId()))
                .body(order);
    }

}
