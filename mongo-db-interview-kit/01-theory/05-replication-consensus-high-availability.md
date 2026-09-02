# 5. Replication, Consensus & High Availability

### Must Know

1. What is a Replica Set in MongoDB?
2. What is the role of the Primary node vs Secondary nodes?
3. How does automatic failover and election work when the Primary goes down (Raft/Paxos consensus)?
4. What is the **Oplog** (Operations Log) and how do secondaries sync with the Primary?
5. What is **Write Concern** (`w: 1`, `w: "majority"`, `j: true`)?
6. What is **Read Preference** (`primary`, `primaryPreferred`, `secondary`, `secondaryPreferred`, `nearest`)?
7. What is **Read Concern** (`local`, `majority`, `linearizable`, `snapshot`)?
