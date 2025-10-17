  // Sample user data
        const users = [
            { id: 1, name: "Sarah Johnson", mutualFriends: 8, avatar: "https://randomuser.me/api/portraits/women/44.jpg", isFriend: false, requestSent: false },
            { id: 2, name: "Michael Chen", mutualFriends: 12, avatar: "https://randomuser.me/api/portraits/men/22.jpg", isFriend: false, requestSent: false },
            { id: 3, name: "Emily Rodriguez", mutualFriends: 5, avatar: "https://randomuser.me/api/portraits/women/68.jpg", isFriend: false, requestSent: false },
            { id: 4, name: "David Wilson", mutualFriends: 3, avatar: "https://randomuser.me/api/portraits/men/64.jpg", isFriend: false, requestSent: false },
            { id: 5, name: "Jessica Brown", mutualFriends: 15, avatar: "https://randomuser.me/api/portraits/women/26.jpg", isFriend: false, requestSent: false },
            { id: 6, name: "Robert Taylor", mutualFriends: 7, avatar: "https://randomuser.me/api/portraits/men/36.jpg", isFriend: false, requestSent: false }
        ];

        const friends = [
            { id: 7, name: "Jennifer Smith", mutualFriends: 25, avatar: "https://randomuser.me/api/portraits/women/32.jpg", isFriend: true },
            { id: 8, name: "James Miller", mutualFriends: 18, avatar: "https://randomuser.me/api/portraits/men/75.jpg", isFriend: true },
            { id: 9, name: "Amanda Davis", mutualFriends: 22, avatar: "https://randomuser.me/api/portraits/women/63.jpg", isFriend: true }
        ];

        // Sample friend requests
        let receivedRequests = [
            { id: 10, name: "Daniel Martinez", mutualFriends: 4, avatar: "https://randomuser.me/api/portraits/men/41.jpg", time: "2 days ago" },
            { id: 11, name: "Sophia Williams", mutualFriends: 9, avatar: "https://randomuser.me/api/portraits/women/41.jpg", time: "1 week ago" }
        ];

        let sentRequests = [
            { id: 12, name: "Christopher Lee", mutualFriends: 6, avatar: "https://randomuser.me/api/portraits/men/55.jpg", time: "1 day ago" },
            { id: 13, name: "Olivia Garcia", mutualFriends: 11, avatar: "https://randomuser.me/api/portraits/women/55.jpg", time: "3 days ago" }
        ];

        // DOM Elements
        const usersGrid = document.getElementById('users-grid');
        const friendsGrid = document.getElementById('friends-grid');
        const receivedRequestsList = document.getElementById('received-requests-list');
        const sentRequestsList = document.getElementById('sent-requests-list');
        const menuItems = document.querySelectorAll('.menu-item');
        const contentSections = document.querySelectorAll('.content-section');
        const tabs = document.querySelectorAll('.tab');

        // Initialize the dashboard
        document.addEventListener('DOMContentLoaded', function() {
            renderUsers();
            renderFriends();
            renderReceivedRequests();
            renderSentRequests();
            
            // Menu navigation
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-target');
                    
                    // Update active menu item
                    menuItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show corresponding content section
                    contentSections.forEach(section => {
                        section.classList.remove('active');
                        if (section.id === targetId) {
                            section.classList.add('active');
                        }
                    });
                });
            });
            
            // Tab navigation
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabName = this.getAttribute('data-tab');
                    
                    // Update active tab
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Handle tab content (in a real app, this would filter content)
                    if (tabName === 'all-users') {
                        renderUsers();
                    } else if (tabName === 'sent-requests') {
                        // In a real app, this would show only users with sent requests
                        alert('Showing users with sent friend requests');
                    } else if (tabName === 'received-requests') {
                        // In a real app, this would show only users with received requests
                        alert('Showing users with received friend requests');
                    }
                });
            });
        });

        // Render user cards
        function renderUsers() {
            usersGrid.innerHTML = '';
            
            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.className = 'user-card';
                userCard.innerHTML = `
                    <div class="user-cover"></div>
                    <div class="user-info">
                        <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                        <div class="user-name">${user.name}</div>
                        <div class="user-mutual">${user.mutualFriends} mutual friends</div>
                        <div class="user-actions">
                            ${user.requestSent 
                                ? `<button class="btn btn-outline" onclick="cancelRequest(${user.id})">Cancel Request</button>`
                                : `<button class="btn btn-primary" onclick="sendRequest(${user.id})">Add Friend</button>`
                            }
                            <button class="btn btn-secondary">Remove</button>
                        </div>
                    </div>
                `;
                usersGrid.appendChild(userCard);
            });
        }

        // Render friends
        function renderFriends() {
            friendsGrid.innerHTML = '';
            
            friends.forEach(friend => {
                const friendCard = document.createElement('div');
                friendCard.className = 'user-card';
                friendCard.innerHTML = `
                    <div class="user-cover"></div>
                    <div class="user-info">
                        <img src="${friend.avatar}" alt="${friend.name}" class="user-avatar">
                        <div class="user-name">${friend.name}</div>
                        <div class="user-mutual">${friend.mutualFriends} mutual friends</div>
                        <div class="user-actions">
                            <button class="btn btn-primary">Message</button>
                            <button class="btn btn-secondary" onclick="unfriend(${friend.id})">Unfriend</button>
                        </div>
                    </div>
                `;
                friendsGrid.appendChild(friendCard);
            });
        }

        // Render received requests
        function renderReceivedRequests() {
            receivedRequestsList.innerHTML = '';
            
            if (receivedRequests.length === 0) {
                receivedRequestsList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-user-friends"></i>
                        <h3>No friend requests</h3>
                        <p>When you have friend requests, they'll appear here</p>
                    </div>
                `;
                return;
            }
            
            receivedRequests.forEach(request => {
                const requestItem = document.createElement('div');
                requestItem.className = 'request-item';
                requestItem.innerHTML = `
                    <img src="${request.avatar}" alt="${request.name}" class="request-avatar">
                    <div class="request-info">
                        <div class="request-name">${request.name}</div>
                        <div class="request-meta">${request.mutualFriends} mutual friends • ${request.time}</div>
                    </div>
                    <div class="request-actions">
                        <button class="btn btn-success" onclick="acceptRequest(${request.id})">Confirm</button>
                        <button class="btn btn-secondary" onclick="declineRequest(${request.id})">Delete</button>
                    </div>
                `;
                receivedRequestsList.appendChild(requestItem);
            });
        }

        // Render sent requests
        function renderSentRequests() {
            sentRequestsList.innerHTML = '';
            
            if (sentRequests.length === 0) {
                sentRequestsList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-user-plus"></i>
                        <h3>No sent requests</h3>
                        <p>When you send friend requests, they'll appear here</p>
                    </div>
                `;
                return;
            }
            
            sentRequests.forEach(request => {
                const requestItem = document.createElement('div');
                requestItem.className = 'request-item';
                requestItem.innerHTML = `
                    <img src="${request.avatar}" alt="${request.name}" class="request-avatar">
                    <div class="request-info">
                        <div class="request-name">${request.name}</div>
                        <div class="request-meta">${request.mutualFriends} mutual friends • ${request.time}</div>
                    </div>
                    <div class="request-actions">
                        <button class="btn btn-danger" onclick="cancelSentRequest(${request.id})">Cancel Request</button>
                    </div>
                `;
                sentRequestsList.appendChild(requestItem);
            });
        }

        // Friend request functions
        function sendRequest(userId) {
            const user = users.find(u => u.id === userId);
            if (user) {
                user.requestSent = true;
                sentRequests.push({
                    id: user.id,
                    name: user.name,
                    mutualFriends: user.mutualFriends,
                    avatar: user.avatar,
                    time: "Just now"
                });
                renderUsers();
                renderSentRequests();
                alert(`Friend request sent to ${user.name}`);
            }
        }

        function cancelRequest(userId) {
            const user = users.find(u => u.id === userId);
            if (user) {
                user.requestSent = false;
                sentRequests = sentRequests.filter(req => req.id !== userId);
                renderUsers();
                renderSentRequests();
                alert(`Friend request to ${user.name} cancelled`);
            }
        }

        function cancelSentRequest(requestId) {
            const request = sentRequests.find(req => req.id === requestId);
            if (request) {
                const user = users.find(u => u.id === requestId);
                if (user) {
                    user.requestSent = false;
                }
                sentRequests = sentRequests.filter(req => req.id !== requestId);
                renderUsers();
                renderSentRequests();
                alert(`Friend request to ${request.name} cancelled`);
            }
        }

        function acceptRequest(requestId) {
            const request = receivedRequests.find(req => req.id === requestId);
            if (request) {
                friends.push({
                    id: request.id,
                    name: request.name,
                    mutualFriends: request.mutualFriends,
                    avatar: request.avatar,
                    isFriend: true
                });
                receivedRequests = receivedRequests.filter(req => req.id !== requestId);
                renderReceivedRequests();
                renderFriends();
                alert(`You are now friends with ${request.name}`);
            }
        }

        function declineRequest(requestId) {
            const request = receivedRequests.find(req => req.id === requestId);
            if (request) {
                receivedRequests = receivedRequests.filter(req => req.id !== requestId);
                renderReceivedRequests();
                alert(`Friend request from ${request.name} declined`);
            }
        }

        function unfriend(friendId) {
            const friend = friends.find(f => f.id === friendId);
            if (friend) {
                friends = friends.filter(f => f.id !== friendId);
                renderFriends();
                alert(`You are no longer friends with ${friend.name}`);
            }
        }