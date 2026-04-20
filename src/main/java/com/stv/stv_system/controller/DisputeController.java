package com.stv.stv_system.controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stv.stv_system.entity.disputes;
import com.stv.stv_system.service.DisputeService;
@RestController
@RequestMapping("/api/disputes")
public class DisputeController {
    private final DisputeService disputeService;
    public DisputeController(DisputeService disputeService) {
        this.disputeService = disputeService;
    }
    // POST /api/disputes
    @PostMapping
    public disputes raiseDispute(@RequestParam Long ticketId,
                                @RequestParam Long userId,
                                @RequestParam String reason) {
        return disputeService.raiseDispute(ticketId, userId, reason);
    }
    // PUT /api/disputes/{id}/resolve
    @PutMapping("/{id}/resolve")
    public disputes resolveDispute(@PathVariable Long id,
                                  @RequestParam Long officerId,
                                  @RequestParam String decision,
                                  @RequestParam String remark) {
        return disputeService.resolveDispute(id, officerId, decision, remark);
    }
}
