package com.stackroute.ssiservice.repository;

import com.stackroute.ssiservice.dto.Filter;
import com.stackroute.ssiservice.dto.SsiSearchRequest;
import com.stackroute.ssiservice.model.SsiDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.lang.reflect.Field;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.Integer.parseInt;

@Repository
public class SsiRepository {
    @Autowired
    private EntityManager entityManager;


    public TypedQuery<SsiDetails> findBySearchParams(SsiSearchRequest ssiSearchRequest) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<SsiDetails> criteriaQuery = criteriaBuilder.createQuery(SsiDetails.class);
        Root<SsiDetails> ssiDetailsRoot = criteriaQuery.from(SsiDetails.class);

        List<String> col = Arrays.stream(SsiDetails.class.getDeclaredFields()).map(n -> n.getName()).collect(Collectors.toList());

        CriteriaQuery<SsiDetails> select = criteriaQuery.select(ssiDetailsRoot);

        List<Predicate> predicates = new ArrayList<>();
        if (ssiSearchRequest.getFilter() != null) {
            for (Filter filter : ssiSearchRequest.getFilter()) {
                System.out.println(filter);
                if (col.contains(filter.getColumn())) {
                    switch (filter.getOperator()) {
                        case "equal": {
                            if (!filter.getValues()[0].isEmpty() ) {
                                if (filter.getColumn() == "ssiRefId") {
                                    predicates.add(criteriaBuilder.equal(ssiDetailsRoot.get(filter.getColumn()), filter.getValues()[0]));
                                } else {
                                    predicates.add(criteriaBuilder.equal(ssiDetailsRoot.get(filter.getColumn()), filter.getValues()[0]));
                                }
                            }
                        }
                    }
                }
            }
        }

        if (ssiSearchRequest.getSort() != null) {

            if (col.contains(ssiSearchRequest.getSort().get("column"))) {
                if (ssiSearchRequest.getSort().get("order").equals("desc")) {
                    criteriaQuery.orderBy(criteriaBuilder.desc(ssiDetailsRoot.get(ssiSearchRequest.getSort().get("column"))));
                } else {
                    criteriaQuery.orderBy(criteriaBuilder.asc(ssiDetailsRoot.get(ssiSearchRequest.getSort().get("column"))));
                }
            }
        }

        criteriaQuery.where(predicates.toArray(new Predicate[0]));


        return entityManager.createQuery(criteriaQuery);

    }

}
