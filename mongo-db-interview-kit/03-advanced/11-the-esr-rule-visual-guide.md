# 11. The ESR Rule Visual Guide



```text
Query: db.orders.find({ status: "active", total: { $gte: 100 } }).sort({ orderDate: -1 })

❌ BAD INDEX:  { total: 1, status: 1, orderDate: -1 }  (Range first kills sort & equality)
✅ BEST INDEX: { status: 1, orderDate: -1, total: 1 }  (Equality -> Sort -> Range)
```
