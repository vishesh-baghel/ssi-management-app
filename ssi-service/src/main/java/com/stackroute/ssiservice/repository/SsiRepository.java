package com.stackroute.ssiservice.repository;

import com.stackroute.ssiservice.dto.Filter;
import com.stackroute.ssiservice.dto.SsiSearchRequest;
import com.stackroute.ssiservice.model.SsiDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import java.lang.reflect.Field;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class SsiRepository {
    @Autowired
    private EntityManager entityManager;


    public List<SsiDetails> findBySearchParams(SsiSearchRequest ssiSearchRequest){

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<SsiDetails> criteriaQuery = criteriaBuilder.createQuery(SsiDetails.class);

        List<String> col = Arrays.stream(SsiDetails.class.getDeclaredFields()).map(n->n.getName()).collect(Collectors.toList());

        Root<SsiDetails> ssiDetailsRoot = criteriaQuery.from(SsiDetails.class);
        CriteriaQuery<SsiDetails> select = criteriaQuery.select(ssiDetailsRoot);

        List<Predicate> predicates = new ArrayList<>();
        for (Filter filter:ssiSearchRequest.getFilter()) {
            if(col.contains(filter.getValues()[0])){
                predicates.add(criteriaBuilder.equal(ssiDetailsRoot.get(filter.getColumn()),filter.getValues()[0]));
            }
        }

        System.out.println(ssiSearchRequest.getSort());
        if(col.contains(ssiSearchRequest.getSort().get("column"))){
            if(ssiSearchRequest.getSort().get("order").equals("desc")){
                criteriaQuery.orderBy(criteriaBuilder.desc(ssiDetailsRoot.get(ssiSearchRequest.getSort().get("column"))));
            }else{
                criteriaQuery.orderBy(criteriaBuilder.asc(ssiDetailsRoot.get(ssiSearchRequest.getSort().get("column"))));
            }
        }
        criteriaQuery.where(predicates.toArray(new Predicate[0]));
        return entityManager.createQuery(criteriaQuery).setFirstResult((ssiSearchRequest.getOffset()-1)*ssiSearchRequest.getCount() ).setMaxResults(ssiSearchRequest.getCount()).getResultList();
    }


}
